import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea: React.FC<TextareaProps> = (props) => {
    return (
        <textarea
            {...props}
            className={`w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${props.className ?? ''
                }`}
        />
    );
};
