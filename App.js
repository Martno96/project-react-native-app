import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Linking from 'expo-linking';

import { SensorComponent } from './components/SensorComponent';
import QuoteHandler from './components/QuoteHandler'
import StepCounter from './components/StepCounter'
import { Button, TouchableOpacity } from 'react-native';

const AppWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const BaseText = styled.Text`
  color: white;
  font-family: 'Courier New';
`;

const Title = styled(BaseText)`
  flex: 0.25;
  align-items: center;
  font-size: 30px;
  padding: 0px;
  margin: 35px 15px 5px 15px;
`;

const TodayText = styled(BaseText)`
  font-size: 16px;
`;

//these don't get applied for some reason :((
const IncrementButton = styled.TouchableOpacity`
  margin: 20px 15px 25px 15px;
  padding: 10px 25px;
  border: 2px solid #fff;
  border-radius: 15px;
`;

const ButtonLabel = styled(BaseText)`
  font-size: 26px;
`;

const Explanation = styled(BaseText)`
    font-size: 14px;
    margin: 5px 30px 5px 30px;
    text-align: center;
    color: grey;
`;

const Footer = styled(BaseText)`
  font-size: 12px;
  padding-bottom: 30px;
  margin: 15px 50px 15px 50px;
  text-align: center;
`;

const Linky = styled(BaseText)`
  color: #2ca3e8;
`;



const App = () => {

  const [steps, setSteps] = useState(847)
  const [currentQuote, setCurrentQuote] = useState({text: "", name: "", length: 0, shown: 0})
  const [revealHeld, setRevealHeld] = useState(false)
  const [timer, setTimer] = useState(null)

  const onStep = (newSteps) => {

    const adjustedSteps = Math.ceil(newSteps.steps / 5)

    setSteps(steps + adjustedSteps)
  };

  const onCurrentQuoteChange = (quote) => {
    setCurrentQuote(quote)
  };

  const reveal = () => {
    
    if (currentQuote.shown >= currentQuote.length) {
      //do nothing :)
    } else if (steps >= 0 + 100) {
      setCurrentQuote({text: currentQuote.text, name: currentQuote.name, length: currentQuote.length, shown: currentQuote.shown + 1})
      setSteps(steps - 100)

    }

    /*https://medium.com/@pavolfulop/repeat-onpress-action-when-holding-button-react-native-2c697cf28032*/
                  //onPressIn={() => {while(steps > 0) {setTimeout(startReveal)}}}
    //https://docs.expo.io/versions/latest/sdk/pedometer/ 
  };

  const startReveal = () => {
    console.log("reveal START")
    if (steps > 0 && revealHeld) {
      setCurrentQuote ({
        text: currentQuote.text, 
        name: currentQuote.name, 
        length: currentQuote.length, 
        shown: currentQuote.shown + 1
      })
      setSteps(steps - 1)
      
    } //so the issue is that the onPressOut can never be triggered because the program is stuck in a loop
    setTimer(setTimeout(startReveal, 500))
  };

  const stopReveal = () => {
    setRevealHeld(false)
    setTimer(clearTimeout(timer))
  };

  //how does onCurrentQuoteChange fit in with incrementation? Is it obsolete now??


  return (
      <AppWrapper>
        
        <Title>Zen Walker</Title>

        <TodayText>Quote of the Day</TodayText>

        <QuoteHandler 
          shown={currentQuote.shown}
          onCurrentQuoteChange={onCurrentQuoteChange}
          currentQuote={currentQuote}
          startReveal={startReveal}
          onStep={onStep}
        />

        <StepCounter 
          steps={steps} 
          onStep={onStep}
        />
        <Explanation>100 steps = 1 word</Explanation>

        <IncrementButton
          onPress={() => {reveal(10)}}
        >
          <ButtonLabel>reveal</ButtonLabel>
        </IncrementButton>

        <Footer>Inspirational quotes provided by <Linky onPress={() => {Linking.openURL("https://zenquotes.io/")}}>ZenQuotes API</Linky></Footer>
      </AppWrapper>
  );
};

export default App;
