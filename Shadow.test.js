import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from "@material-ui/core/Button";
import axios from "axios";
import {NavLink} from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SignIn from "./SignIn";
import Input from "@material-ui/core/Input";


Enzyme.configure({
    adapter: new Adapter(),
});


const Example=(props)=>{
    return (<div>
        <button> type="submit"
            fullWidth
            variant="contained"
            color="primary"

            >
            Register</button>
        <Button
            type="a"
            fullWidth
            variant="contained"
            color="primary"

            onClick={function btnAction()
            {
                axios({
                    method: "POST",
                    url:"https://varificationbackend.herokuapp.com/send",
                    data: {
                        name: username1,
                        email: email1,
                        message: vari
                    }
                }).then((response)=>{
                    if (response.data.msg === 'success'){
                        alert("Message Sent.");

                    }else if(response.data.msg === 'fail'){
                        alert("Message failed to send.")
                    }
                }) }

            }
        >
            Verification
        </Button>
    </div>)
}


const {shallow}=Enzyme

Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme shallow button name test', function () {
    it('Example component', function () {
        const name='register'
        let app = shallow(<Example text={name} />)
        let btnName=app.find('button').text();
        console.log('button Name:'+btnName)
    })
})
//////////////////////////////////////////////////////////////////////////////

const Example2=(props)=>{
    return (<div>
        <InputLabel htmlFor="email">Email</InputLabel>

    </div>)
}
describe('Enzyme shallow2 inputLabel test', function () {
    it('Example component', function () {
        const name='Sign In'
        let app = shallow(<Example text={name} />)
        let btnName=app.find('InputLabel');
        console.log('InputLabel:'+btnName)
    })
})


//////////////////////////////////////////////////////////////////////////////

//Input value test
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mirror: ''
        };
        this.updateMirror = this.updateMirror.bind(this);
    }

    updateMirror(e) {
        let val = e.target.value;
        this.setState((prevState, props) => {
            return {
                mirror: val
            };
        });
    }

    render() {
        return <div>
            <div><input type="text" onChange={this.updateMirror} /></div>
            <div test="mirror">{this.state.mirror}</div>
        </div>
    }
}

const wrapper = shallow(<App />);
wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
expect(wrapper.state('mirror')).toBe('Your new Value');


const mockFn = jest.fn();
it('should call mock function when button is clicked', () => {
    const tree = shallow(
        <Button name='button test' handleClick={mockFn} />
    );
    tree.simulate('click');
    //expect(mockFn).toHaveBeenCalled();
});

//////////////////////////////////////////////////////////////////////////////
// snap shot testing

const Button2 = ({ name, handleClick }) => {
    return (

        <input className="button2" type="button2" value={name} onClick={handleClick} />

    );
}

describe('Button2', () => {
    it('should be defined', () => {
        expect(Button2).toBeDefined();
    });
    it('should render correctly', () => {
        const tree = shallow(
            <Button name='button test' />
        );
        expect(tree).toMatchSnapshot();
    });
});
//////////////////////////////////////////////////////////////////////////////

const expectedNode2 = shallow(
    (<div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            name= "SignIn"
        >
            Sign in
        </Button>
    </div>)
);


describe('Enzyme Sign in Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode2).toBeDefined();
    });
    const actualNode2 = shallow(<SignIn/>);
    expect(actualNode2).toMatchSnapshot();;
})



//////////////////////////////////////////////////////////////////////////////

const expectedNode3 = shallow(
    (<div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            name="submit"

        >
            Register
        </Button>
    </div>)
);

describe('Enzyme Sign in Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode3).toBeDefined();
    });
    const actualNode3 = shallow(<submit/>);
    expect(actualNode3).toMatchSnapshot();})

//////////////////////////////////////////////////////////////////////////////



const expectedNode4 = shallow(
    (<div>
            <Button
                type="a"
                fullWidth
                variant="contained"
                color="primary"
               name="verification"
                onClick={function btnAction()
                {
                    axios({
                        method: "POST",
                        url:"https://varificationbackend.herokuapp.com/send",
                        data: {
                            name: username1,
                            email: email1,
                            message: vari
                        }
                    }).then((response)=>{
                        if (response.data.msg === 'success'){
                            alert("Message Sent.");

                        }else if(response.data.msg === 'fail'){
                            alert("Message failed to send.")
                        }
                    }) }

                }
            >
                Verification
            </Button>
    </div>)
);



describe('Enzyme Sign in Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode4).toBeDefined();
    });
    const actualNode4 = shallow(<verification/>);
    expect(actualNode4).toMatchSnapshot();})




//////////////////////////////////////////////////////////////////////////////




const expectedNode5 = shallow(
    (<div>

        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="verificationcode">verification code</InputLabel>
            <Input name="verificationcode" id="verificationcode" autoComplete="verificationcode" />
        </FormControl>

    </div>)
);


//////////////////////////////////////////////////////////////////////////////

describe('Enzyme formcontrol1 Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode5).toBeDefined();
    });
    const actualNode5 = shallow(<verification code/>);
    expect(actualNode5).toMatchSnapshot();})




const expectedNode6 = shallow(
    (<div>

        <FormControl margin="normal" required fullWidth>
            <InputLabel>Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
        </FormControl>

    </div>)
);



describe('Enzyme formcontrol2 Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode6).toBeDefined();
    });
    const actualNode6 = shallow(<password/>);
    expect(actualNode6).toMatchSnapshot();})


/////////////////////////////////////////////////////////////////////////////

const expectedNode7 = shallow(
    (<div>

        <FormControl margin="normal" >
            <InputLabel htmlFor="fullname">Full Name</InputLabel>
            <Input id="fullname" name="fullname" autoFocus />
        </FormControl>

    </div>)
);



describe('Enzyme formcontrol3 Snapshot', function () {
    it('should be defined', () => {
        expect(expectedNode7).toBeDefined();
    });
    const actualNode7 = shallow(<password/>);
    expect(actualNode7).toMatchSnapshot();})



//////////////////////////////////////////////////////////////////////////////
const SignIn3=(props)=> {
    return(<div>
        <button className="simple-button">Click</button>
        <button>Click With Arg</button>
    </div>)
}

const expectedNode8 = shallow(
    <div>
        <button className="simple-button">Click</button>
        <button>Click With Arg</button>
    </div>
);

// WHEN
describe('Enzyme Sign In button test2', function () {
    const actualNode18 = shallow(<SignIn3/>);
// THEN
    expect(actualNode18.html()).toEqual(expectedNode8.html());
})


//////////////////////////////////////////////////////////////////////////////
