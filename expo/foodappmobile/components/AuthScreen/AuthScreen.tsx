import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BrandColors } from '../../constants/Colors';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  API_URL: string;
}

// Only one export default allowed per file
function AuthScreen({ onAuthSuccess, API_URL }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!username.trim() || !password.trim()) {
      return Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    }

    if (!isLogin && (!name.trim() || !email.trim())) {
      return Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        try {
          const res = await axios.post(`${API_URL}/user/login`, { username, password });
          onAuthSuccess(res.data);
        } catch (error) {
          Alert.alert('Thông báo', 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
          console.log('Login API error, using mock data:', error);
        }
      } else {
        try {
          const res = await axios.post(`${API_URL}/user/register`, { username, password, name, email });
          Alert.alert('Thành công', 'Đăng ký thành công!');
          setIsLogin(true);
        } catch (error) {
          console.log('Register API error:', error);
          Alert.alert('Thông báo', 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
        }
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err?.response?.data?.error || 'Có lỗi xảy ra' || err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[BrandColors.primary, BrandColors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/food-app-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Food App</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </Text>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              placeholderTextColor="#9e9e9e"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9e9e9e"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            placeholderTextColor="#9e9e9e"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#9e9e9e"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchButtonText}>
              {isLogin
                ? 'Chưa có tài khoản? Đăng ký ngay'
                : 'Đã có tài khoản? Đăng nhập'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    maxWidth: 400,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BrandColors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: BrandColors.textPrimary,
  },
  submitButton: {
    backgroundColor: BrandColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchButtonText: {
    color: BrandColors.textSecondary,
    fontSize: 14,
  },
});

export default AuthScreen;



