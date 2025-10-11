import React, { useState } from 'react';

function Level17_FormValidation() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (formData.username.length < 3) {
            newErrors.username = 'ユーザー名は3文字以上必要です';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'パスワードは8文字以上必要です';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'パスワードが一致しません';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (submitted) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Level 17: フォームバリデーション</h1>
                <h2 style={{ color: 'green' }}>✓ 登録完了しました！</h2>
                <p>ユーザー名: {formData.username}</p>
                <p>メール: {formData.email}</p>
                <button onClick={() => { setSubmitted(false); setFormData({ username: '', email: '', password: '', confirmPassword: '' }); }}>
                    戻る
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Level 17: フォームバリデーション</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>ユーザー名</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px', borderColor: errors.username ? 'red' : '#ccc' }}
                    />
                    {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px', borderColor: errors.email ? 'red' : '#ccc' }}
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>パスワード</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px', borderColor: errors.password ? 'red' : '#ccc' }}
                    />
                    {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>パスワード確認</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px', borderColor: errors.confirmPassword ? 'red' : '#ccc' }}
                    />
                    {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</p>}
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                    登録
                </button>
            </form>
        </div>
    );
}

export default Level17_FormValidation;

