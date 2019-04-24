import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {NavLink} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";



Enzyme.configure({
    adapter: new Adapter(),
});

export default Enzyme;
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
// export default Example

//////////////////////////////////////////////////////////////////////////////

const SignIn=(props)=> {
    return (<div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

        >
            Sign in
        </Button>
    </div>)
}









// Render Static
//react -->component to static html
//detect no of bottons and spans
const {shallow,mount,render}=Enzyme

Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme Button Sign in test1', function () {
    it('Example render', function () {
        const name='button name'
        let app = render(<Example text={name} />)

        const buttonObj=app.find('button')
        const spanObj=app.find('span')

        console.info(`找到的buttOn：${buttonObj.length}`)
        console.info(`number of spans：${spanObj.length}`)

        buttonObj.text(),spanObj.text()
    })
})
// const {shallow,mount}=Enzyme
//
// Enzyme.configure({ adapter: new Adapter() })
//
// describe('Enzyme mount的DOM渲染（Full DOM Rendering）中', function () {
//     it('Example组件中按钮的名字为子组件Sub中span的值', function () {
//         const name='按钮名'
//         let app = mount(<Example text={name} />)
//
//         const buttonObj=app.find('button')
//         const spanObj=app.find('span')
//
//         console.info(`查找到button的个数：${buttonObj.length}`)
//         console.info(`查找到span的个数：${spanObj.length}`)
//
//         buttonObj.text(),spanObj.text()
//     })
// })
describe('Enzyme render test2', function () {
    it('Example rende2r', function () {
        const name='button name'
        let app = render(<SignIn text={name} />)

        const buttonObj=app.find('button')
        const spanObj=app.find('span')

        console.info(`找到的buttOn：${buttonObj.length}`)
        console.info(`number of spans：${spanObj.length}`)

        buttonObj.text(),spanObj.text()
    })
})



//////////////////////////////////////////////////////////////////////////////
const SignIn2=(props)=> {
    return (<div>

                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" type="email" autoComplete="email"  />

    </div>)
}
describe('Enzyme render test3', function () {
    it('Example render3', function () {
        const name='InputLabel'
        let app = render(<SignIn2 text={name} />)

        const labelObj=app.find('email')


        console.info(`找到的Label：${labelObj.length}`)

        labelObj.text()
    })
})
describe('Enzyme render test3', function () {
    it('Example render3', function () {
        const name='Inputemail'
        let app = render(<SignIn2 text={name} />)

        const labelObj=app.find('email')

        console.info(`找到的inputemail：${labelObj.length}`)


        labelObj.text()
    })
})

const expectedNode3 = shallow(
    (<div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

        >
            Sign in
        </Button>
    </div>)
);


describe('Enzyme Sign in button test3', function () {
    const actualNode3 = shallow(<SignIn/>);
    expect(actualNode3.html()).toEqual(expectedNode3.html());
})


