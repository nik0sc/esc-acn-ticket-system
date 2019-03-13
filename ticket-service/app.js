const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

app.use(bodyparser.json());

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
    }
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/chat/:chatroomId', (req, res) => {
    knex('chat_messages').select('users.username', 'chat_messages.message', 'chat_messages.sent_time')
        .join('users', 'chat_messages.sent_user_id', '=', 'users.id')
        .where('chat_messages.chatroom_id', req.params.chatroomId)
        .orderBy('chat_messages.sent_time')
        .then((rows) => {
            res.send(rows);
        });
});

app.get('/ticket/:ticketId', (req, res) => {
    console.log('Getting ' + req.params.ticketId);
    var query = knex('tickets')
        .first('tickets.id', 'tickets.title', 'tickets.message',
            'tickets.attachment_path', 'tickets.open_time', 
            'tickets.close_time', 'tickets.priority', 'tickets.severity',
            'tickets.assigned_team', 'tickets.opener_user',
            'users.username', 'users.long_name', 
            'teams.team_name')
        .join('users', 'tickets.opener_user', '=', 'users.id')
        .join('teams', 'tickets.assigned_team', '=', 'teams.id')
        .where('tickets.id', req.params.ticketId);
    
    console.log(query.toString());
    
    query.then((row) => {
        res.send(row);
    });
});

// Middleware function to check tokens against acnapi
// If the token checks out, the session object is injected into request object
function check_session_token(req, res, next) {
    axios.get('https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/sessions/me', {
        headers: {
            'Server-Token': process.env.ACN_SERVER_TOKEN,
            'Content-Type': 'application/json',
            'X-Parse-Session-Token': req.header('X-Parse-Session-Token')
        }
    }).then((res2) => {
        req.acn_session = res2.data;
        if (typeof next === 'function') {
            next();
        }
    }).catch((err) => {
        if (err.response) {
            // Invalid session token
            if (err.response.status === 400 && err.response.data.code === 209) {
                res.status(401).json({
                    'error': 'Invalid session token'
                });
            } else if (err.response.status === 504) {
                console.log('acn timeout');
                res.status(504).json({
                    'error': 'Upstream timeout in acn session management'
                });
            } else {
                console.log('error in session verification');
                var status_string = err.response.status + ' ' + 
                        err.response.statusText;
                console.log(status_string);
                res.status(500).json({
                    'error': 'Upstream error from acn session management',
                    'response': status_string
                });
            }
        } else {
            console.log('error in session verification - no response');
            console.log(err);
            res.status(500).json({
                'error': 'Check server log'
            });
        }
    });
}

app.post('/ticket', check_session_token, (req, res) => {
    console.log('Creating new ticket');

    let user_object_id = req.acn_session.user.objectId;
    
    let query = knex('tickets').insert({
        title: req.body.title,
        message: req.body.message,
        attachment_path: '',
        open_time: knex.fn.now(),
        priority: req.body.priority,
        severity: req.body.severity,
        opener_user: knex('users')
            .first('id')
            .where('acn_id', user_object_id)
    });

    console.log(query.toString());
    
    query.then((id) => {
        res.json({
            'success': 'true',
            'id': id
        });
    })
    .catch((err) => {
        res.status(500)
        .json({
            'error': 'Database error while inserting ticket',
            'ex': err
        });
    });

});

app.put('/ticket/:ticketId', (req, res) => {

});

app.put('/ticket/:ticketId/attachment', (req, res) => {
    // Make sure this ticket exists
    var query = knex('tickets')
        .first('id', 'attachment_path')
        .where('id', req.params.ticketId);
    
    console.log(query.toString());

    query.then((row) => {
        if (typeof row === 'undefined') {
            res.status(404).json({
                'error': 'Ticket id does not exist'
            });
            return;
        }
        
        if (row.attachment_path === '') {
            // Create a directory for this ticket
            var dirpath = 'attachments/' + row.id;
            if (!fs.existsSync(dirpath)) {
                fs.mkdirSync(dirpath);
            }

            
        } 
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            'error': 'Database query error'
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
