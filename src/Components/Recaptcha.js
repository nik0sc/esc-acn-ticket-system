import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google'
import Cookies from 'universal-cookie';


class Recaptcha extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  componentDidMount() {
    if (this.captchaDemo) {
        console.log("started, just a second...")
        this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
      if (this.captchaDemo) {
          this.captchaDemo.reset();
      }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!  
    //console.log(recaptchaToken, "<= your recaptcha token");
    const cookies = new Cookies();
    cookies.set('recaptchaToken', recaptchaToken, {path: '/'});
    
  }
  render() {
    return (
      <div>
        {/* You can replace captchaDemo with any ref word */}
        <ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            data-theme="dark"            
            render="explicit"
            sitekey="6LfYBpoUAAAAAAevnt7ip82_7WHY5yA0yqUC77x6"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />
      </div>
    );
  };
};
export default Recaptcha;