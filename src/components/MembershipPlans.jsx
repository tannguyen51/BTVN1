import React, { useState, useEffect } from 'react';

const MembershipPlans = ({ onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);

    useEffect(() => {
        const hasMembership = localStorage.getItem('hasMembership') === 'true';
        const membershipPlan = localStorage.getItem('membershipPlan');

        if (hasMembership && membershipPlan) {
            setCurrentPlan(membershipPlan);
        }
    }, []);

    const plans = [
        {
            id: 1,
            name: '1 Month',
            price: '600,000',
            description: 'Full access to all features',
            features: [
                'Unlimited doctor consultations',
                'Personalized quitting plan',
                'Premium content access',
                'Community support'
            ],
            popular: false,
            color: '#44b89d'
        },
        {
            id: 2,
            name: '6 Months',
            price: '3,000,000',
            description: 'Save 16% compared to monthly plan',
            features: [
                'All features from Monthly plan',
                'Priority doctor support',
                'Monthly progress reports',
                'Exclusive health webinars'
            ],
            popular: true,
            color: '#0057b8'
        },
        {
            id: 3,
            name: '1 Year',
            price: '5,400,000',
            description: 'Save 25% compared to monthly plan',
            features: [
                'All features from 6-month plan',
                'Dedicated health coach',
                'Quarterly health assessments',
                'Family account (up to 3 members)'
            ],
            popular: false,
            color: '#002f6c'
        }
    ];

    const handlePurchaseMembership = () => {
        if (!selectedPlan) return;

        // Simulate purchase
        localStorage.setItem('hasMembership', 'true');
        localStorage.setItem('membershipPlan', selectedPlan.name);
        setCurrentPlan(selectedPlan.name);
        setSelectedPlan(null);

        alert(`You have successfully purchased the ${selectedPlan.name} membership plan.`);
    };

    const handleCancelMembership = () => {
        localStorage.removeItem('hasMembership');
        localStorage.removeItem('membershipPlan');
        setCurrentPlan(null);
        setShowConfirmCancelModal(false);

        alert('Your membership has been canceled successfully.');
    };

    return (
        <div className="membership-plans-container">
            <div className="modal-header">
                <h2 className="modal-title">Membership Plans</h2>
                <button className="close-button" onClick={onClose}>✕</button>
            </div>

            {currentPlan ? (
                <div className="current-plan-section">
                    <div className="current-plan-info">
                        <h3>Your Current Plan</h3>
                        <div className="current-plan-details">
                            <span className="plan-badge">{currentPlan}</span>
                            <p>Your membership is active and provides full access to all premium features.</p>
                        </div>
                        <div className="current-plan-actions">
                            <button
                                className="btn btn-outline"
                                onClick={() => setCurrentPlan(null)}
                            >
                                Change Plan
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => setShowConfirmCancelModal(true)}
                            >
                                Cancel Membership
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-center mb-4">Choose the plan that works best for you</p>
                    <div className="plans-grid">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                                onClick={() => setSelectedPlan(plan)}
                            >
                                {plan.popular && (
                                    <div className="popular-badge">MOST POPULAR</div>
                                )}
                                <div className="plan-header" style={{ backgroundColor: `${plan.color}22` }}>
                                    <h3 className="plan-name">{plan.name}</h3>
                                    <div className="plan-price">
                                        <span className="price-value">{plan.price}</span>
                                        <span className="price-currency">VND</span>
                                    </div>
                                    <p className="plan-description">{plan.description}</p>
                                </div>
                                <div className="plan-features">
                                    <ul>
                                        {plan.features.map((feature, index) => (
                                            <li key={index}>
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" stroke={plan.color} strokeWidth="2" />
                                                    <path d="M8 12l2 2 4-4" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div
                                    className="plan-select"
                                    style={{
                                        borderColor: selectedPlan?.id === plan.id ? plan.color : 'transparent',
                                        backgroundColor: selectedPlan?.id === plan.id ? `${plan.color}11` : 'transparent'
                                    }}
                                >
                                    {selectedPlan?.id === plan.id && (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" fill={plan.color} fillOpacity="0.2" stroke={plan.color} strokeWidth="2" />
                                            <path d="M8 12l2 2 6-6" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <span>Select Plan</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            disabled={!selectedPlan}
                            onClick={handlePurchaseMembership}
                        >
                            Purchase Plan
                        </button>
                    </div>
                </>
            )}

            {/* Confirm Cancel Modal */}
            {showConfirmCancelModal && (
                <div className="confirm-modal-overlay">
                    <div className="confirm-modal">
                        <h3>Cancel Membership</h3>
                        <p>Are you sure you want to cancel your membership? You will lose access to all premium features.</p>
                        <div className="confirm-actions">
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowConfirmCancelModal(false)}
                            >
                                Keep Membership
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleCancelMembership}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .membership-plans-container {
          max-width: 900px;
          width: 100%;
        }
        
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .plan-card {
          background-color: var(--white);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--box-shadow-sm);
          transition: var(--transition);
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          border: 2px solid transparent;
        }
        
        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--box-shadow);
        }
        
        .plan-card.selected {
          box-shadow: var(--box-shadow-lg);
        }
        
        .plan-card.popular {
          transform: scale(1.05);
          z-index: 10;
        }
        
        .popular-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ff9800;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-bottom-left-radius: var(--border-radius-sm);
          letter-spacing: 0.5px;
        }
        
        .plan-header {
          padding: 1.5rem;
          text-align: center;
          border-bottom: 1px solid var(--gray-200);
        }
        
        .plan-name {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }
        
        .plan-price {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
        }
        
        .price-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary-color);
        }
        
        .price-currency {
          font-size: 1rem;
          color: var(--gray-600);
        }
        
        .plan-description {
          color: var(--gray-600);
          font-size: 0.875rem;
          margin-bottom: 0;
        }
        
        .plan-features {
          padding: 1.5rem;
          flex-grow: 1;
        }
        
        .plan-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-dark);
        }
        
        .plan-select {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          font-weight: 600;
          color: var(--primary-color);
          background-color: transparent;
          transition: var(--transition);
          margin-top: auto;
          border-top: 2px solid transparent;
        }
        
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .current-plan-section {
          background-color: var(--gray-100);
          border-radius: var(--border-radius);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .current-plan-info h3 {
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        .current-plan-details {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .plan-badge {
          background-color: var(--secondary-color);
          color: white;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.9rem;
        }
        
        .current-plan-actions {
          display: flex;
          gap: 1rem;
        }
        
        .confirm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
        }
        
        .confirm-modal {
          background-color: white;
          border-radius: var(--border-radius);
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: var(--box-shadow-lg);
        }
        
        .confirm-modal h3 {
          margin-bottom: 1rem;
          color: var(--danger-color);
        }
        
        .confirm-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
      `}</style>
        </div>
    );
};

export default MembershipPlans; 