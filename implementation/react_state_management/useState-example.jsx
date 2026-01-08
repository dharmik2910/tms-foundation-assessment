/**
 * useState Example - Simple Component State
 * Use for: Form inputs, UI toggles, component-local state
 */

import React, { useState } from 'react';

function RegistrationForm() {
  // Component-local state - perfect for useState
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.program) newErrors.program = 'Please select a program';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registrations/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', program: '' });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      {showSuccess && (
        <div className="success-message">
          Registration successful!
        </div>
      )}

      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Program</label>
        <select
          name="program"
          value={formData.program}
          onChange={handleChange}
        >
          <option value="">Select a program</option>
          <option value="life-science">Life Science Wing</option>
          <option value="evinetco">EViNetCo-wing</option>
          <option value="agri">Agri Wing</option>
        </select>
        {errors.program && <span className="error">{errors.program}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>

      {errors.submit && <div className="error">{errors.submit}</div>}
    </form>
  );
}

export default RegistrationForm;


