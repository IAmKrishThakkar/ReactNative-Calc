import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const App = () => {
  const [input, setInput] = useState(''); // User input

  // Handle button press to append input
  const handleButtonPress = (value) => {
    setInput((prev) => prev + value);
  };

  // Handle clear button
  const handleClear = () => {
    setInput('');
  };

  // Handle backspace (delete last character)
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      let calculation = input
        .replace('π', Math.PI.toString()) // Replace π with Math.PI
        .replace('√', Math.sqrt.toString()) // Replace √ with Math.sqrt()
        .replace('%', '/100') // Replace % with /100 for percentage calculation
        .replace('^', '**'); // Replace ^ with ** for exponentiation (ES6)

      // Evaluate the updated expression
      const result = eval(calculation);
      setInput(result.toString());
    } catch (error) {
      setInput('Error'); // Handle any error during calculation
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Display */}
      <View style={styles.displayContainer}>
        <TextInput
          style={styles.displayText}
          value={input}
          placeholder="0"
          placeholderTextColor="#888"
          editable={false} // Make input non-editable
        />
      </View>

      {/* Button Rows */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('√')}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('π')}>
          <Text style={styles.buttonText}>π</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('^')}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleBackspace}>
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('(')}>
          <Text style={styles.buttonText}>(</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress(')')}>
          <Text style={styles.buttonText}>)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[7, 8, 9, '/'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, item === '/' ? styles.operatorButton : styles.numberButton]}
            onPress={() => handleButtonPress(item.toString())}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {[4, 5, 6, '*'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, item === '*' ? styles.operatorButton : styles.numberButton]}
            onPress={() => handleButtonPress(item.toString())}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {[1, 2, 3, '-'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, item === '-' ? styles.operatorButton : styles.numberButton]}
            onPress={() => handleButtonPress(item.toString())}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handleButtonPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handleButtonPress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleCalculate}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818', // Darker background for the overall screen
    padding: 20,
    justifyContent: 'flex-end',
  },
  displayContainer: {
    backgroundColor: '#2E2E2E', // Dark grey background for the display area
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  displayText: {
    color: '#FFFFFF', // White text for the input
    fontSize: 45,
    textAlign: 'right',
    padding: 10,
    minWidth: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#444444', // Lighter grey background for buttons
    borderRadius: 25,
    marginHorizontal: 3,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Added shadow for more depth
  },
  buttonText: {
    color: '#FFFFFF', // White text for button labels
    fontSize: 29,
    fontWeight: 'bold',
  },
  // Add specific button styles for operators and special buttons
  operatorButton: {
    backgroundColor: '#293142', // Dark blue for operator buttons like +, -, *, /
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
  equalButton: {
    backgroundColor: '#3B8F24', // Green for the "=" button
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
  clearButton: {
    backgroundColor: '#1A3B84', // Dark Blue for the "AC" clear button
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
  numberButton: {
    backgroundColor: '#4B77D8', // Light Blue for number buttons
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
});

export default App;
