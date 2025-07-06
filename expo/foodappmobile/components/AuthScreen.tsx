import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface AuthProps {
  onAuthSuccess: (user: any) => void;
  API_URL: string;
}

export default function AuthScreen({ onAuthSuccess, API_URL }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/user/login`, { username, password });
        onAuthSuccess(res.data);
      } else {
        const res = await axios.post(`${API_URL}/user/register`, { username, password, name, email });
        Alert.alert('Đăng ký thành công!');
        setIsLogin(true);
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err?.response?.data?.error || 'Có lỗi xảy ra' || err.message); 
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</Text>
      <TextInput placeholder="Tên đăng nhập" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {!isLogin && (
        <>
          <TextInput placeholder="Họ tên" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        </>
      )}
      <Button title={isLogin ? 'Đăng nhập' : 'Đăng ký'} onPress={handleAuth} />
      <Text style={styles.switchText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { width: '90%', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 6 },
  switchText: { color: 'blue', marginTop: 12 },
});
