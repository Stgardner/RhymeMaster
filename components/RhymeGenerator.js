import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { API_KEY } from '../env';

const RhymeGeneratorScreen = () => {
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState(8);
  const [generatedRap, setGeneratedRap] = useState('');

  const handleGenerateRap = async () => {
    if (inputText.trim() === '') {
      console.log('Please enter a word or phrase');
      return;
    }

    try {
      const rhymeLength = selectedOption;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are the best rapper in the world.' },
            { role: 'user', content: `Write a rap with ${selectedOption} lines following an AABB rhyme scheme, and use this as your first line:\n\n"${inputText}"\n` }
          ],
          max_tokens: 100 * rhymeLength,
          temperature: 1.2,
          n: rhymeLength,
          stop: '\n',
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        const generatedLines = data.choices.map(choice => choice.message.content.trim());
    
        // Preserve line breaks and indentation
        const generatedRapText = generatedLines.join('\n');
    
        setGeneratedRap(generatedRapText);
      } else {
        console.log('Failed to generate rap:', data);
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rap Generator</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the first line of a rap"
          value={inputText}
          onChangeText={setInputText}
        />
        <Text style={styles.inputText}>"{inputText}"</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionsLabel}>Select Rhyme Length:</Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 4 && styles.optionButtonSelected]}
            onPress={() => setSelectedOption(4)}
          >
            <Text style={[styles.optionButtonText, selectedOption === 4 && styles.optionButtonTextSelected]}>4 bars</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 8 && styles.optionButtonSelected]}
            onPress={() => setSelectedOption(8)}
          >
            <Text style={[styles.optionButtonText, selectedOption === 8 && styles.optionButtonTextSelected]}>8 bars</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 16 && styles.optionButtonSelected]}
            onPress={() => setSelectedOption(16)}
          >
            <Text style={[styles.optionButtonText, selectedOption === 16 && styles.optionButtonTextSelected]}>16 bars</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGenerateRap}>
        <Text style={styles.buttonText}>Flow</Text>
      </TouchableOpacity>

      <View style={styles.generatedRapContainer}>
        <Text style={styles.generatedRap}>{generatedRap}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionButtonSelected: {
    backgroundColor: 'blue',
  },
  optionButtonText: {
    fontSize: 16,
    color: 'black',
  },
  optionButtonTextSelected: {
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  generatedRapContainer: {
    marginTop: 20,
  },
  generatedRap: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default RhymeGeneratorScreen;
