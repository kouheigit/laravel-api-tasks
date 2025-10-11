import React, { useState } from 'react';

function Level28_StepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        email: '',
        // Step 2
        address: '',
        phone: '',
        // Step 3
        plan: '',
        paymentMethod: ''
    });

    const totalSteps = 3;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        alert('フォームを送信しました！\n' + JSON.stringify(formData, null, 2));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h3>基本情報</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label>名前</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>メールアドレス</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>連絡先情報</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label>住所</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>電話番号</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>プラン選択</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label>プラン</label>
                            <select
                                name="plan"
                                value={formData.plan}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            >
                                <option value="">選択してください</option>
                                <option value="basic">ベーシック - ¥1,000/月</option>
                                <option value="standard">スタンダード - ¥2,000/月</option>
                                <option value="premium">プレミアム - ¥5,000/月</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>支払い方法</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            >
                                <option value="">選択してください</option>
                                <option value="credit">クレジットカード</option>
                                <option value="bank">銀行振込</option>
                                <option value="convenience">コンビニ払い</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Level 28: ステップフォーム</h1>
            
            {/* Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                {[1, 2, 3].map(step => (
                    <div key={step} style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: currentStep >= step ? '#2196F3' : '#e0e0e0',
                            color: currentStep >= step ? 'white' : '#999',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            fontWeight: 'bold'
                        }}>
                            {step}
                        </div>
                        <div style={{ marginTop: '5px', fontSize: '12px', color: currentStep >= step ? '#2196F3' : '#999' }}>
                            {step === 1 && '基本情報'}
                            {step === 2 && '連絡先'}
                            {step === 3 && 'プラン'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', minHeight: '200px' }}>
                {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: currentStep === 1 ? '#ccc' : '#9e9e9e',
                        color: 'white',
                        border: 'none',
                        cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                        borderRadius: '5px'
                    }}
                >
                    前へ
                </button>
                {currentStep < totalSteps ? (
                    <button
                        onClick={nextStep}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        次へ
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        送信
                    </button>
                )}
            </div>
        </div>
    );
}

export default Level28_StepForm;

