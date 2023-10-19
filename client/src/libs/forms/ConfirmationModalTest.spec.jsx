import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

test('renders modal when isOpen is true', () => {
  const handleCloseModal = jest.fn();
  const onConfirm = jest.fn();
  render(
    <ConfirmationModal isOpen={true} onClose={handleCloseModal} onConfirm={onConfirm} />
  );

  const modal = screen.getByText(/Are you sure you want to proceed\?/i);
  expect(modal).toBeInTheDocument();
});

test('does not render modal when isOpen is false', () => {
  const handleCloseModal = jest.fn();
  const onConfirm = jest.fn();
  render(
    <ConfirmationModal isOpen={false} onClose={handleCloseModal} onConfirm={onConfirm} />
  );

  const modal = screen.queryByText(/Are you sure you want to proceed\?/i);
  expect(modal).not.toBeInTheDocument();
});

test('calls onClose when "No" button is clicked', () => {
  const handleCloseModal = jest.fn();
  const onConfirm = jest.fn();
  render(
    <ConfirmationModal isOpen={true} onClose={handleCloseModal} onConfirm={onConfirm} />
  );

  const noButton = screen.getByText('No');
  fireEvent.click(noButton);

  expect(handleCloseModal).toHaveBeenCalled();
  expect(onConfirm).not.toHaveBeenCalled();
});

test('calls onConfirm when "Yes" button is clicked', () => {
  const handleCloseModal = jest.fn();
  const onConfirm = jest.fn();
  render(
    <ConfirmationModal isOpen={true} onClose={handleCloseModal} onConfirm={onConfirm} />
  );

  const yesButton = screen.getByText('Yes');
  fireEvent.click(yesButton);

  expect(handleCloseModal).not.toHaveBeenCalled();
  expect(onConfirm).toHaveBeenCalled();
});
