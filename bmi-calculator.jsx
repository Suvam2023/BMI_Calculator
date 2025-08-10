import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [progressColor, setProgressColor] = useState(''); // Bootstrap color class

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid height and weight");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    // Determine BMI category and progress bar color
    let color = '';
    let cat = '';
    if (bmiValue < 18.5) {
      color = 'info';
      cat = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      color = 'success';
      cat = 'Normal';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      color = 'warning';
      cat = 'Overweight';
    } else {
      color = 'danger';
      cat = 'Obese';
    }

    setCategory(cat);
    setProgressColor(color);
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setProgressColor('');
  };

  // Limit progress bar width (BMI rarely goes beyond 40)
  const getProgressWidth = () => {
    const value = parseFloat(bmi);
    if (value > 40) return 100;
    return (value / 40) * 100;
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">BMI Calculator</h2>

      <form onSubmit={calculateBMI} className="d-flex flex-column gap-3">
        <input
          type="number"
          className="form-control"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Calculate</button>
        <button type="button" className="btn btn-danger" onClick={resetForm}>Reset</button>
      </form>

      {bmi && (
        <div className="mt-4">
          <div className="mb-2">
            <strong>Your BMI: {bmi}</strong> <span className="text-muted">({category})</span>
          </div>

          <div className="progress" style={{ height: '30px' }}>
            <div
              className={`progress-bar bg-${progressColor}`}
              role="progressbar"
              style={{ width: `${getProgressWidth()}%` }}
              aria-valuenow={bmi}
              aria-valuemin="0"
              aria-valuemax="40"
            >
              {bmi}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-2 text-muted">
            <small>0</small>
            <small>10</small>
            <small>20</small>
            <small>30</small>
            <small>40+</small>
          </div>
        </div>
      )}
    </div>
  );
}
