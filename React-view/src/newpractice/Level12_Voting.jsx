import React, { useState } from 'react';

function Level12_Voting() {
    const [polls, setPolls] = useState([
        { id: 1, question: '好きな言語は？', options: [
            { text: 'JavaScript', votes: 0 },
            { text: 'Python', votes: 0 },
            { text: 'Java', votes: 0 }
        ]},
        { id: 2, question: '好きなフレームワークは？', options: [
            { text: 'React', votes: 0 },
            { text: 'Vue', votes: 0 },
            { text: 'Angular', votes: 0 }
        ]}
    ]);

    const vote = (pollId, optionIndex) => {
        setPolls(polls.map(poll => {
            if (poll.id === pollId) {
                const newOptions = [...poll.options];
                newOptions[optionIndex].votes += 1;
                return { ...poll, options: newOptions };
            }
            return poll;
        }));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 12: 投票アプリ</h1>
            {polls.map(poll => {
                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                return (
                    <div key={poll.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
                        <h3>{poll.question}</h3>
                        <p>総投票数: {totalVotes}</p>
                        {poll.options.map((option, index) => {
                            const percentage = totalVotes > 0 ? (option.votes / totalVotes * 100).toFixed(1) : 0;
                            return (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <button onClick={() => vote(poll.id, index)}>
                                        {option.text} ({option.votes}票)
                                    </button>
                                    <div style={{
                                        width: '200px',
                                        height: '20px',
                                        backgroundColor: '#eee',
                                        marginTop: '5px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            backgroundColor: '#4CAF50'
                                        }}></div>
                                        <span style={{ position: 'absolute', left: '5px', top: '0' }}>
                                            {percentage}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Level12_Voting;

