/**
 * All components related to interacting with quiz located here
 */
// react imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from '../assets/canvasjs.react';
// helper
import { GetTotalAnswersCorrect, GetTopFiveResults, gotCorrect } from '../helper';
// api
import { API } from '../api/Api.jsx';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * Given required sessionid
 * will redirect to required page
 * view results for specific session
 * @param {JSONObject} props sessionId
 * @returns JSXElement
 */
export function SessionPage (props) {
  const sessionId = props.sessionId;
  const [resultsData, setResultsData] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  useEffect(async () => {
    const response = await new API().getSessionResults(sessionId);
    if (response.status === 200) {
      setResultsData(response.data);
      console.log(response.data.results)
      if (response.data.results !== undefined && response.data.results.length > 0) {
        setDataPoints(GetTotalAnswersCorrect(response.data));
      }
    } else {
      console.log(response);
    }
    console.log(resultsData)
  }, [])

  const totalDataOptions = {
    title: {
      text: 'Total answered correctly'
    },
    theme: 'dark1',
    data: [{
      type: 'column',
      dataPoints: dataPoints[0],
    }]
  }
  const totalAverageOptions = {
    title: {
      text: 'Average answer time (seconds)'
    },
    theme: 'dark1',
    data: [{
      type: 'column',
      dataPoints: dataPoints[1],
    }]
  }

  return (
    <>
      <h1>Results for session {sessionId}</h1>
      {dataPoints.length !== 0
        ? <>
          <CanvasJSChart options = {totalDataOptions}/>
          <CanvasJSChart options = {totalAverageOptions}/>
          <h5 className='mt-4'>Top five results</h5>
          <ol>
            {GetTopFiveResults(resultsData).map((result, index) => {
              return (<li key={index}>{result.name} with {gotCorrect(result)} correct</li>);
            })}
          </ol>
        </>
        : <h1>No data to display. No one has attempted this quiz.</h1>
      }
    </>
  );
}

SessionPage.propTypes = {
  sessionId: PropTypes.string.isRequired,
}
