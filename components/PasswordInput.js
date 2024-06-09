import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import COLORS from '../../constants/Colors';
import { Controller } from 'react-hook-form';
import useToggle from '../../hooks/useToggle';

const PasswordInput = ({ control, name, placeholder, rules, errors, secureTextEntry,label }) => {
  const [isPasswordVisible,togglePasswordVisible]=useToggle(false)

  const inputStyle = {
    width: '100%',
    height: 48,
    borderColor: errors[name] ? 'red' : COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  };

 
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
        textTransform: 'capitalize'
      }}>
        {label}
      </Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        value={value}
        onChangeText={onChange}
        mode='outlined'
        secureTextEntry={!isPasswordVisible} 
       right={<TextInput.Icon icon={isPasswordVisible?"eye":'eye-off'} onPress={() => togglePasswordVisible()} />}
       outlineStyle={inputStyle}
      />
      )}
      name={name}
    />
     {errors[name] && <Text style={{color:'red',fontSize:10,fontWeight:500}}>{errors[name]?.message}</Text>}
    </View>
  );
};

export default PasswordInput;
