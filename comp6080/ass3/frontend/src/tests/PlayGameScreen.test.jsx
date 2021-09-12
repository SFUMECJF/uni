/**
 * Tests PlayGameScreen
 */
import { shallow } from 'enzyme';
import React from 'React';
import { PlayGameScreen } from '../components/Play.jsx';

// will create a screen for user to play
// check if all the data is created property
// check if all the questions are shown properly
// check if correct image/video is shown for questionData
describe('Play Game Screen', () => {
  const questionData = {
    duration: 30,
    photo: 'https://www.youtube.com/embed/frOGNtNcU0c',
    userAnswers: [1, 2, 3, 4],
    pointValue: '1',
    type: 'radio',
    question: 'test?',
  }
  // initial render check
  it('mounts shallow render', () => {
    const testRender = shallow(<PlayGameScreen questionData={questionData}/>);
    expect(testRender).toMatchSnapshot();
  });

  const play = shallow(<PlayGameScreen questionData={questionData}/>);
  // test all of the content
  // question
  it('shows user question', () => {
    const question = play.find('h5');
    expect(question.text()).toEqual('test?');
  });
  it('check snapshot after user question check', () => {
    const question = play.find('h5');
    expect(question).toMatchSnapshot();
  });
  // Timer
  it('shows correct duration', () => {
    const duration = play.find('span');
    expect(duration.text()).toEqual(`Time left: ${questionData.duration}`);
  });
  it('check snapshot after user duration check', () => {
    const duration = play.find('span');
    expect(duration).toMatchSnapshot();
  });
  // points value
  it('shows correct point value', () => {
    const points = play.find('FormText');
    expect(points.text()).toEqual(`Points: ${questionData.pointValue}`);
  });
  it('check snapshot after user point check', () => {
    const points = play.find('FormText');
    expect(points).toMatchSnapshot();
  });
  // embed video check exists
  it('shows correct image/photo', () => {
    const noImage = play.find('img');
    expect(noImage).toHaveLength(0);
    const embed = play.find('iframe');
    expect(embed).toHaveLength(1);
  });
  // answer type
  it('shows correct answer type and answers', () => {
    const answers = play.find({ type: questionData.type });
    expect(answers).toHaveLength(4);
  });
  it('check snapshot after user answer check', () => {
    const answers = play.find({ type: questionData.type });
    expect(answers).toMatchSnapshot();
  });
})
