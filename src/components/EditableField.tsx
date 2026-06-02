import React, { useState, useRef } from 'react';

interface EditableFieldProps {
  value: string;
  onChange?: (val: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EditableField({
  value,
  onChange,
  multiline = false,
  placeholder = 'Click to edit…',
  className = '',
  style,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  function startEdit() {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function commit() {
    setEditing(false);
    onChange?.(localValue);
  }

  const sharedStyle: React.CSSProperties = {
    background: 'transparent',
    color: '#fff',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    width: '100%',
    padding: 0,
    resize: 'none',
    ...style,
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          onBlur={commit}
          rows={3}
          style={{ ...sharedStyle, borderBottom: '1px solid #EB1000' }}
          className={className}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        onBlur={commit}
        style={{ ...sharedStyle, borderBottom: '1px solid #EB1000' }}
        className={className}
      />
    );
  }

  return (
    <span
      onClick={startEdit}
      title="Click to edit"
      style={{
        cursor: 'text',
        borderBottom: '1px solid transparent',
        display: 'block',
        minHeight: '1.2em',
        color: localValue ? '#fff' : '#666',
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderBottomColor = '#444';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
      }}
      className={className}
    >
      {localValue || placeholder}
    </span>
  );
}
