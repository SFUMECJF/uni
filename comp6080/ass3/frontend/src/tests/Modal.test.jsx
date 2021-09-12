/**
 * Tests modal!
 */
import { shallow } from 'enzyme';
import React from 'React';
import { CustomModal } from '../components/Modal.jsx';

// will create a modal with some tests stuff in it
// modal should have a title, have the content, have two methods of closing it
// and should not allow keyboard dismissal
// if modal can have content, it can have anything in it
// them most relied upon and reused component!!!
describe('Modal', () => {
  // test can mount
  // initial snapshot render check
  it('Modal shallow renders onto page', () => {
    const testRender = shallow(<CustomModal show={true} title={'Test'} content={<text>This is a test</text>}/>);
    expect(testRender).toMatchSnapshot();
  });

  const modal = shallow(<CustomModal show={true} title={'Test'} content={<text>This is a test</text>}/>);
  // test title
  it('modal title is "Test"', () => {
    const title = modal.find('ModalTitle');
    expect(title.text()).toEqual('Test');
  });
  it('check snapshot after title', () => {
    const title = modal.find('ModalTitle');
    expect(title).toMatchSnapshot();
  });

  // test contents
  it('Modal content is "This is a test"', () => {
    const content = modal.find('ModalBody');
    expect(content.text()).toEqual('This is a test');
  });
  it('Check snapshot after content', () => {
    const content = modal.find('ModalBody');
    expect(content).toMatchSnapshot();
  });

  // test close button
  it('Can close via pressable close button', () => {
    const closeButton = modal.find('Button');
    closeButton.simulate('click');
    // ensure that nothing has changed after clicking it
    expect(closeButton).toMatchSnapshot();
  })

  // test close x button at top
  it('Can close via x button at top', () => {
    const closeX = modal.find({ closeButton: true });
    closeX.simulate('click');
    expect(closeX).toMatchSnapshot();
  })
})
