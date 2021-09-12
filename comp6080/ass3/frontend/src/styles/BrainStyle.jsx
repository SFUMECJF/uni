/**
 * Main style folder for all styles for brain app
 */

// styled components import
import styled, { keyframes } from 'styled-components';

/**
 *
 * All styles used for navigation
 *
 */
// fade in animation
export const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
// main content body
export const MainContent = styled.main`
  margin: 0 auto;
  width: 60%;
  min-width: 300px;
  animation: ${FadeIn};
  animation-duration: 0.8s;
  transition: visibility is linear;
  padding-top: 3%;

`;

// main theme for app
export const BrainTheme = styled.div`
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: #090C10;
  color: white;
  padding-bottom: 150px;
`;

// Div for footer to allow proper space
export const FooterDiv = styled.div`
  margin-top: -150px;
`;

/**
 *
 * Login all styles
 *
 */
export const AuthFormDiv = styled.div`
`;

/**
 *
 * Dashboard styles
 *
 */

export const DashboardDiv = styled.div`
  text-align: center;
`;

// flex for for cards
export const CardFlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

// container for cards! allows a nice transition when hovering over them
// used for questions and quizes alike!
export const CardContainer = styled.div`
  opacity:0.8;
  transition-duration: 0.7s;
  text-align: left;
  &:hover {
    opacity: 1;
  }
`;

/**
 * Play game styles
 */
export const PlayGameContainer = styled.div`
  min-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid white;
  border-radius: 20px;
  padding: 15px;
  background-color: #0D1117;
`;
