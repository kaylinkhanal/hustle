'use client';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { GripVertical, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './dropdown.module.css';

const CreatableMultiselectWithDnD = () => {
  const [companies, setCompanies] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreate = (inputValue) => {
    const newCompany = {
      id: Date.now().toString(),
      name: inputValue,
      years: '',
      startDate: null,
      endDate: null,
      isPresent: false,
    };
    setCompanies([...companies, newCompany]);
    setInputValue('');
  };

  const handleYearsChange = (id, years) => {
    setCompanies(companies.map((company) =>
      company.id === id ? { ...company, years } : company
    ));
  };

  const handleDateChange = (id, field, date) => {
    setCompanies(companies.map((company) =>
      company.id === id ? { ...company, [field]: date } : company
    ));
  };

  const handlePresentToggle = (id) => {
    setCompanies(companies.map((company) =>
      company.id === id ? { ...company, isPresent: !company.isPresent, endDate: null } : company
    ));
  };

  const handleRemove = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  return (
    <div className={styles.container}>
      <CreatableSelect
        isClearable
        onChange={(newValue) => {}}
        onCreateOption={handleCreate}
        options={[]}
        value={null}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        placeholder="Enter a company name..."
        className={styles.select}
      />
      <ul className={styles.list}>
        {companies.map((company, index) => (
          <li key={company.id} className={styles.listItem}>
            <span className={styles.companyName}>{company.name}</span>
            <Input
              type="text"
              value={company.years}
              onChange={(e) => handleYearsChange(company.id, e.target.value)}
              placeholder="Years"
              className={styles.yearsInput}
            />
            <div className={styles.datePickerContainer}>
              <DatePicker
                selected={company.startDate}
                onChange={(date) => handleDateChange(company.id, 'startDate', date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Start Date"
                className={styles.datePicker}
              />
              {!company.isPresent && (
                <DatePicker
                  selected={company.endDate}
                  onChange={(date) => handleDateChange(company.id, 'endDate', date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="End Date"
                  className={styles.datePicker}
                />
              )}
              <div className={styles.presentContainer}>
                <Checkbox
                  id={`present-${company.id}`}
                  checked={company.isPresent}
                  onCheckedChange={() => handlePresentToggle(company.id)}
                />
                <label htmlFor={`present-${company.id}`}>Present</label>
              </div>
            </div>
            <Button
              onClick={() => handleRemove(company.id)}
              variant="ghost"
              size="icon"
              className={styles.removeButton}
            >
              <X size={20} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatableMultiselectWithDnD;