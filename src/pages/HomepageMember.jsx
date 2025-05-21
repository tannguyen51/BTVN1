/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SecondaryNavigation from '../components/SecondaryNavigation';
import MembershipPlans from '../components/MembershipPlans';
import DashboardCard from '../components/DashboardCard';

function HomepageMember() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [hasMembership, setHasMembership] = useState(false);
    const [membershipPlan, setMembershipPlan] = useState('');
    const [smokeFreeCount, setSmokeFreeCount] = useState(0);
    const [cigarettesPerDay, setCigarettesPerDay] = useState(0);
    const [pricePerPack, setPricePerPack] = useState(0);
    const [cigarettesPerPack, setCigarettesPerPack] = useState(0);

    useEffect(() => {
        // Check if user is logged in
        const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const storedUserName = localStorage.getItem('userName');

        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            navigate('/login');
        }

        // Check if user has purchased a membership
        const membership = localStorage.getItem('hasMembership') === 'true';
        const plan = localStorage.getItem('membershipPlan');
        setHasMembership(membership);
        setMembershipPlan(plan || '');

        // Get smoking stats
        const count = localStorage.getItem('smokeFreeCount');
        const perDay = localStorage.getItem('cigarettesPerDay');
        const price = localStorage.getItem('pricePerPack');
        const perPack = localStorage.getItem('cigarettesPerPack');

        setSmokeFreeCount(count ? parseInt(count, 10) : 0);
        setCigarettesPerDay(perDay ? parseInt(perDay, 10) : 20);
        setPricePerPack(price ? parseInt(price, 10) : 35000);
        setCigarettesPerPack(perPack ? parseInt(perPack, 10) : 20);
    }, [navigate]);

    const handleManageMembership = () => {
        setShowMembershipModal(true);
    };

    // Calculate money saved
    const calculateMoneySaved = () => {
        const cigaretteCost = pricePerPack / cigarettesPerPack;
        return Math.round(smokeFreeCount * cigarettesPerDay * cigaretteCost);
    };

    // Calculate not smoked cigarettes
    const calculateCigarettesNotSmoked = () => {
        return smokeFreeCount * cigarettesPerDay;
    };

    // Calculate time added to life (rough estimate)
    const calculateTimeAdded = () => {
        // Estimate: Each cigarette reduces life by 11 minutes
        const minutesSaved = calculateCigarettesNotSmoked() * 11;
        const days = Math.floor(minutesSaved / (60 * 24));
        return days;
    };

    return (
        <div className="homepage-member">
            <Header userName={userName} />
            <SecondaryNavigation />

            <div className="container">
                <section className="welcome-section">
                    <div className="welcome-content">
                        <h1>Welcome, {userName}!</h1>
                        <p>Your journey to a smoke-free life is in progress. Here's your current progress and membership information.</p>
                    </div>
                    <div className="welcome-actions">
                        <button
                            className="btn btn-primary"
                            onClick={handleManageMembership}
                        >
                            {hasMembership ? 'Manage Membership' : 'Get Membership Plan'}
                        </button>
                    </div>
                </section>

                {hasMembership && (
                    <section className="membership-info">
                        <div className="membership-badge">
                            <span className="membership-label">Active Membership:</span>
                            <span className="membership-value">{membershipPlan}</span>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={handleManageMembership}
                        >
                            Manage Plan
                        </button>
                    </section>
                )}

                <section className="stats-section">
                    <h2 className="section-title">Your Progress</h2>
                    <div className="stats-grid">
                        <DashboardCard
                            title="Smoke-Free Days"
                            value={smokeFreeCount}
                            description="Keep going! Every day matters."
                            icon="🎯"
                            color="#44b89d"
                        />
                        <DashboardCard
                            title="Money Saved"
                            value={`${calculateMoneySaved().toLocaleString()} VND`}
                            description="Savings from not buying cigarettes"
                            icon="💰"
                            color="#0057b8"
                        />
                        <DashboardCard
                            title="Cigarettes Not Smoked"
                            value={calculateCigarettesNotSmoked()}
                            description="That's a lot of harmful chemicals avoided!"
                            icon="🚭"
                            color="#ff9800"
                        />
                        <DashboardCard
                            title="Life Regained"
                            value={`${calculateTimeAdded()} days`}
                            description="Estimated time added to your life"
                            icon="⏱️"
                            color="#e74c3c"
                        />
                    </div>
                </section>

                <section className="quick-actions">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="action-cards">
                        <div className="action-card" onClick={() => navigate('/track-status')}>
                            <div className="action-icon" style={{ backgroundColor: '#44b89d20' }}>📊</div>
                            <div className="action-content">
                                <h3>Track Your Status</h3>
                                <p>View detailed information about your quitting journey and chat with your doctor.</p>
                            </div>
                        </div>
                        <div className="action-card" onClick={() => navigate('/dashboard-member')}>
                            <div className="action-icon" style={{ backgroundColor: '#0057b820' }}>📝</div>
                            <div className="action-content">
                                <h3>Create or Update Plan</h3>
                                <p>Set up a personalized quitting plan or update your existing one.</p>
                            </div>
                        </div>
                        <div className="action-card" onClick={() => navigate('/doctors')}>
                            <div className="action-icon" style={{ backgroundColor: '#e74c3c20' }}>👨‍⚕️</div>
                            <div className="action-content">
                                <h3>Find a Doctor</h3>
                                <p>Connect with specialized doctors to get support for your journey.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Membership Modal */}
            {showMembershipModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <MembershipPlans onClose={() => setShowMembershipModal(false)} />
                    </div>
                </div>
            )}

            <style jsx>{`
                .homepage-member {
                    min-height: 100vh;
                    background-color: var(--background-color);
                }
                
                .welcome-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--white);
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                    padding: 2rem;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--box-shadow);
                }
                
                .welcome-content h1 {
                    margin-bottom: 0.5rem;
                    color: var(--primary-color);
                    font-size: 2.2rem;
                }
                
                .welcome-content p {
                    color: var(--text-light);
                    margin-bottom: 0;
                    max-width: 600px;
                }
                
                .membership-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--gray-100);
                    margin-bottom: 2rem;
                    padding: 1rem 2rem;
                    border-radius: var(--border-radius);
                    border-left: 4px solid var(--secondary-color);
                }
                
                .membership-badge {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .membership-label {
                    font-weight: 600;
                    color: var(--text-dark);
                }
                
                .membership-value {
                    background-color: var(--secondary-color);
                    color: white;
                    font-weight: 700;
                    padding: 0.35rem 0.75rem;
                    border-radius: var(--border-radius-pill);
                    font-size: 0.9rem;
                }
                
                .stats-section {
                    margin-bottom: 2.5rem;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                
                .quick-actions {
                    margin-bottom: 3rem;
                }
                
                .action-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                
                .action-card {
                    display: flex;
                    align-items: flex-start;
                    background-color: var(--white);
                    padding: 1.5rem;
                    border-radius: var(--border-radius);
                    box-shadow: var(--box-shadow);
                    gap: 1rem;
                    transition: var(--transition);
                    cursor: pointer;
                }
                
                .action-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--box-shadow-lg);
                }
                
                .action-icon {
                    width: 3rem;
                    height: 3rem;
                    border-radius: var(--border-radius);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                
                .action-content h3 {
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                    color: var(--text-dark);
                }
                
                .action-content p {
                    margin: 0;
                    color: var(--text-light);
                    font-size: 0.95rem;
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(3px);
                }
                
                .modal-content {
                    background-color: var(--white);
                    border-radius: var(--border-radius-lg);
                    padding: 0;
                    max-width: 900px;
                    width: 90%;
                    position: relative;
                    box-shadow: var(--box-shadow-lg);
                    max-height: 90vh;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}

export default HomepageMember; 