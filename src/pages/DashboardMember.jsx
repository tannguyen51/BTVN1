import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardMember = () => {
  const [smokeFreeCount, setSmokeFreeCount] = useState(() => {
    const savedCount = localStorage.getItem('smokeFreeCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [startDate, setStartDate] = useState(() => {
    const savedDate = localStorage.getItem('smokeFreeStartDate');
    return savedDate ? new Date(savedDate) : new Date();
  });

  const [cigarettesPerDay, setCigarettesPerDay] = useState(() => {
    const saved = localStorage.getItem('cigarettesPerDay');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [pricePerPack, setPricePerPack] = useState(() => {
    const saved = localStorage.getItem('pricePerPack');
    return saved ? parseInt(saved, 10) : 35000;
  });

  const [cigarettesPerPack, setCigarettesPerPack] = useState(() => {
    const saved = localStorage.getItem('cigarettesPerPack');
    return saved ? parseInt(saved, 10) : 20;
  });

  const [quitChoice, setQuitChoice] = useState(() => {
    const saved = localStorage.getItem('quitChoice');
    return saved || 'not_selected';
  });

  const [customDate, setCustomDate] = useState(() => {
    const saved = localStorage.getItem('customQuitDate');
    return saved || new Date().toISOString().split('T')[0];
  });

  const [hasPlan, setHasPlan] = useState(() => {
    return localStorage.getItem('quitChoice') !== null;
  });

  const [moneySaved, setMoneySaved] = useState(() => {
    // Calculate money saved based on days, cigarettes and price
    const cigaretteCost = pricePerPack / cigarettesPerPack;
    const savedMoney = smokeFreeCount * cigarettesPerDay * cigaretteCost;
    return Math.round(savedMoney);
  });

  useEffect(() => {
    localStorage.setItem('smokeFreeCount', smokeFreeCount);
    localStorage.setItem('smokeFreeStartDate', startDate.toISOString());
    localStorage.setItem('cigarettesPerDay', cigarettesPerDay);
    localStorage.setItem('pricePerPack', pricePerPack);
    localStorage.setItem('cigarettesPerPack', cigarettesPerPack);
    localStorage.setItem('quitChoice', quitChoice);
    localStorage.setItem('customQuitDate', customDate);
  }, [smokeFreeCount, startDate, cigarettesPerDay, pricePerPack, cigarettesPerPack, quitChoice, customDate]);

  const handleQuitChoiceSelect = (choice) => {
    setQuitChoice(choice);

    if (choice === 'today') {
      setStartDate(new Date());
    } else if (choice === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setStartDate(tomorrow);
    } else if (choice === 'custom') {
      const customDateObj = new Date(customDate);
      setStartDate(customDateObj);
    }
  };

  const handleSubmitPlan = () => {
    setHasPlan(true);

    // If today, start counting immediately
    if (quitChoice === 'today') {
      setSmokeFreeCount(1);
    } else {
      setSmokeFreeCount(0);
    }

    // Recalculate money saved
    const cigaretteCost = pricePerPack / cigarettesPerPack;
    const savedMoney = smokeFreeCount * cigarettesPerDay * cigaretteCost;
    setMoneySaved(Math.round(savedMoney));
  };

  const increaseSmokeFreeDay = () => {
    setSmokeFreeCount(prev => prev + 1);

    // Recalculate money saved
    const cigaretteCost = pricePerPack / cigarettesPerPack;
    const newCount = smokeFreeCount + 1;
    const savedMoney = newCount * cigarettesPerDay * cigaretteCost;
    setMoneySaved(Math.round(savedMoney));
  };

  const resetSmokeFreeCount = () => {
    if (window.confirm('Are you sure you want to reset your smoke-free days count?')) {
      setSmokeFreeCount(0);
      setStartDate(new Date());
      setMoneySaved(0);
      setHasPlan(false);
      setQuitChoice('not_selected');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const resetPlan = () => {
    if (window.confirm('Are you sure you want to create a new plan?')) {
      setHasPlan(false);
      setQuitChoice('not_selected');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #f0f7fa 0%, #d5f1e8 100%)',
      fontFamily: '"Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      padding: '2rem',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#2c3e50',
            margin: 0
          }}>Member Dashboard</h1>
          <Link to="/" style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#35a79c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: '500',
            boxShadow: '0 4px 6px rgba(53, 167, 156, 0.2)'
          }}>Back to Home</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ fontWeight: '600', marginBottom: '1rem', color: '#35a79c' }}>Quit Plan</h2>

            {!hasPlan ? (
              <div style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    When is your quit date?
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div>
                      <input
                        type="radio"
                        id="today"
                        name="quitDay"
                        value="today"
                        checked={quitChoice === 'today'}
                        onChange={() => handleQuitChoiceSelect('today')}
                      />
                      <label htmlFor="today" style={{ marginLeft: '0.5rem' }}>Today</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="tomorrow"
                        name="quitDay"
                        value="tomorrow"
                        checked={quitChoice === 'tomorrow'}
                        onChange={() => handleQuitChoiceSelect('tomorrow')}
                      />
                      <label htmlFor="tomorrow" style={{ marginLeft: '0.5rem' }}>Tomorrow</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="custom"
                        name="quitDay"
                        value="custom"
                        checked={quitChoice === 'custom'}
                        onChange={() => handleQuitChoiceSelect('custom')}
                      />
                      <label htmlFor="custom" style={{ marginLeft: '0.5rem' }}>Select my date</label>
                      {quitChoice === 'custom' && (
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          style={{
                            display: 'block',
                            marginTop: '0.5rem',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="not_ready"
                        name="quitDay"
                        value="not_ready"
                        checked={quitChoice === 'not_ready'}
                        onChange={() => handleQuitChoiceSelect('not_ready')}
                      />
                      <label htmlFor="not_ready" style={{ marginLeft: '0.5rem' }}>Not ready yet</label>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Cigarettes smoked per day:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cigarettesPerDay}
                    onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      width: '100%',
                      marginBottom: '1rem'
                    }}
                  />

                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Cigarettes per pack:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cigarettesPerPack}
                    onChange={(e) => setCigarettesPerPack(parseInt(e.target.value))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      width: '100%',
                      marginBottom: '1rem'
                    }}
                  />

                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Price per pack (VND):
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={pricePerPack}
                    onChange={(e) => setPricePerPack(parseInt(e.target.value))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      width: '100%',
                      marginBottom: '1rem'
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmitPlan}
                  disabled={quitChoice === 'not_selected'}
                  style={{
                    padding: '0.7rem 1.2rem',
                    backgroundColor: quitChoice === 'not_selected' ? '#95a5a6' : '#2ecc71',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: quitChoice === 'not_selected' ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(46, 204, 113, 0.3)',
                    width: '100%',
                    marginTop: '1rem'
                  }}
                >
                  Create Plan
                </button>
              </div>
            ) : (
              <div style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                <p>
                  <strong>Start date:</strong> {startDate.toLocaleDateString('en-US')}
                </p>
                <p>
                  <strong>Cigarettes per day:</strong> {cigarettesPerDay}
                </p>
                <p>
                  <strong>Price per pack:</strong> {formatCurrency(pricePerPack)}
                </p>
                <p>
                  <strong>Daily cost:</strong> {formatCurrency(pricePerPack / cigarettesPerPack * cigarettesPerDay)}
                </p>
                <button
                  onClick={resetPlan}
                  style={{
                    padding: '0.7rem 1.2rem',
                    backgroundColor: '#f39c12',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(243, 156, 18, 0.3)',
                    marginTop: '1rem'
                  }}
                >
                  Create New Plan
                </button>
              </div>
            )}
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ fontWeight: '600', marginBottom: '1rem', color: '#35a79c' }}>Progress</h2>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '1rem' }}>
              Smoke-free days: <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>{smokeFreeCount}</span> days<br />
              Money saved: <span style={{ fontWeight: 'bold', color: '#27ae60' }}>{formatCurrency(moneySaved)}</span>
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={increaseSmokeFreeDay}
                style={{
                  padding: '0.7rem 1.2rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(52, 152, 219, 0.3)'
                }}
              >
                Add Smoke-Free Day
              </button>
              <button
                onClick={resetSmokeFreeCount}
                style={{
                  padding: '0.7rem 1.2rem',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(231, 76, 60, 0.3)'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ fontWeight: '600', marginBottom: '1rem', color: '#35a79c' }}>Achievements</h2>
            {smokeFreeCount >= 1 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 1 day smoke-free</p>}
            {smokeFreeCount >= 7 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 7 days smoke-free</p>}
            {smokeFreeCount >= 30 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 30 days smoke-free</p>}
            {smokeFreeCount >= 90 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 90 days smoke-free</p>}
            {smokeFreeCount >= 180 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 180 days smoke-free</p>}
            {smokeFreeCount >= 365 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>🏅 1 year smoke-free!</p>}
            {smokeFreeCount === 0 && <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>You have no achievements yet. Start your quit journey!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ QUAN TRỌNG:
export default DashboardMember;
