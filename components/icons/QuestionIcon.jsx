import React from 'react';

const QuestionIcon = ({ isSelected }) => {
    // Define colors based on the selected state
    const selectedFill = '#005FE2'; // A vibrant blue for selected state
    const unselectedFill = '#525252'; // A dark gray for unselected state
    const backgroundFill = isSelected ? '#E0F2FE' : '#F5F5F5'; // Light blue or light gray for background

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background circle */}
            <path
                d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0Z"
                fill={backgroundFill}
            />

            {/* Background border */}
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0Z" />

            {/* Question mark outline */}
            <path d="M25 28H15V12H25V28Z" />
            <path d="M25 28H15V12H25V28Z" />

            {/* Question mark details */}
            <path
                d="M17.5 17C17.5 15.8969 18.3969 15 19.5 15H20.5C21.6031 15 22.5 15.8969 22.5 17V17.1125C22.5 17.7938 22.1531 18.4281 21.5813 18.7937L20.2625 19.6406C19.475 20.1469 19 21.0188 19 21.9531V22C19 22.5531 19.4469 23 20 23C20.5531 23 21 22.5531 21 22V21.9563C21 21.7 21.1312 21.4625 21.3438 21.325L22.6625 20.4781C23.8062 19.7406 24.5 18.475 24.5 17.1125V17C24.5 14.7906 22.7094 13 20.5 13H19.5C17.2906 13 15.5 14.7906 15.5 17C15.5 17.5531 15.9469 18 16.5 18C17.0531 18 17.5 17.5531 17.5 17ZM20 27C20.3315 27 20.6495 26.8683 20.8839 26.6339C21.1183 26.3995 21.25 26.0815 21.25 25.75C21.25 25.4185 21.1183 25.1005 20.8839 24.8661C20.6495 24.6317 20.3315 24.5 20 24.5C19.6685 24.5 19.3505 24.6317 19.1161 24.8661C18.8817 25.1005 18.75 25.4185 18.75 25.75C18.75 26.0815 18.8817 26.3995 19.1161 26.6339C19.3505 26.8683 19.6685 27 20 27Z"
                fill={isSelected ? selectedFill : unselectedFill}
            />
        </svg>
    );
};

export default QuestionIcon;
