// src/components/common/DepartmentList.jsx
import React from 'react';

const DepartmentList = ({ departments, selectedDepartment, onSelect }) => {
  return (
    <div className="department-list">
      {departments.map(dept => (
        <button 
          key={dept}
          onClick={() => onSelect(dept)}
          className={selectedDepartment === dept ? 'active' : ''}
        >
          {dept}
        </button>
      ))}
    </div>
  );
};

export default DepartmentList;
