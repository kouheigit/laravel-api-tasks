import React, { useState } from 'react';

function Level20_Pagination() {
    const allItems = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `アイテム ${i + 1}`,
        description: `これはアイテム${i + 1}の説明です`
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 表示するページ番号を制限
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift('...');
        }
        if (currentPage + delta < totalPages - 1) {
            range.push('...');
        }

        range.unshift(1);
        if (totalPages !== 1) range.push(totalPages);

        return range;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 20: ページネーション</h1>
            <p>全{allItems.length}件中 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, allItems.length)}件を表示</p>
            
            <div style={{ marginBottom: '20px' }}>
                {currentItems.map(item => (
                    <div key={item.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                        <strong>{item.name}</strong>
                        <p style={{ margin: '5px 0', color: '#666' }}>{item.description}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ padding: '5px 10px' }}
                >
                    前へ
                </button>
                
                {getVisiblePages().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' && paginate(number)}
                        disabled={number === '...'}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: currentPage === number ? '#4CAF50' : 'white',
                            color: currentPage === number ? 'white' : 'black',
                            cursor: number === '...' ? 'default' : 'pointer'
                        }}
                    >
                        {number}
                    </button>
                ))}
                
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ padding: '5px 10px' }}
                >
                    次へ
                </button>
            </div>
        </div>
    );
}

export default Level20_Pagination;

