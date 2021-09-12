/**
 * Testing Register form
 */
import { shallow } from 'enzyme';
import React from 'React';
import { RegisterForm } from '../components/Auth.jsx';

// will create a register form and test the input fields in it
// if labels exist, then inputs exist
// also tests submission will not destroy component
describe('Register', () => {
  // initial snapshot render check
  it('Register shallow renders onto page', () => {
    const testRender = shallow(<RegisterForm />);
    expect(testRender).toMatchSnapshot();
  });

  const form = shallow(<RegisterForm />);
  // test title
  it('title is "Register a new account', () => {
    const title = form.find('h1');
    expect(title.text()).toEqual('Register a new account');
  });

  it('Check snapshot after title', () => {
    const title = form.find('h1');
    expect(title).toMatchSnapshot();
  });

  // test email
  it('Email title is "Email"', () => {
    const email = form.find({ controlId: 'registerEmail' }).find('FormLabel');
    expect(email.text()).toEqual('Email');
  });

  it('Check snapshot after Email', () => {
    const email = form.find({ controlId: 'registerEmail' }).find('FormLabel');
    expect(email).toMatchSnapshot();
  });

  // test password
  it('Password title is "Password"', () => {
    const password = form.find({ controlId: 'registerPassword' }).find('FormLabel');
    expect(password.text()).toEqual('Password');
  });

  it('Check snapshot after Password', () => {
    const password = form.find({ controlId: 'registerPassword' }).find('FormLabel');
    expect(password).toMatchSnapshot();
  });

  // test confirm password
  it('Confirm password title is "Confirm password"', () => {
    const password = form.find({ controlId: 'registerConfirmPassword' }).find('FormLabel');
    expect(password.text()).toEqual('Confirm password');
  });

  it('Check snapshot after Confirm password', () => {
    const password = form.find({ controlId: 'registerConfirmPassword' }).find('FormLabel');
    expect(password).toMatchSnapshot();
  });

  // test username
  it('Username title is "Username"', () => {
    const username = form.find({ controlId: 'registerUsername' }).find('FormLabel');
    expect(username.text()).toEqual('Username');
  });

  it('Check snapshot after username', () => {
    const username = form.find({ controlId: 'registerUsername' }).find('FormLabel');
    expect(username).toMatchSnapshot();
  });

  // test submit empty fail
  it('Simulate submission register', () => {
    const submit = form.find('Button');
    submit.simulate('click');
    // ensure that the form is not validated
    const formSubmitted = form.find({ validated: false })
    expect(formSubmitted).toHaveLength(1);
  });
  // back button
  it('Check Back button', () => {
    const back = form.find('a');
    expect(back.text()).toEqual('Back');
  })
})
