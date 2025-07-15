import React, { useState } from 'react';
import { registerType } from '../api/registerTypeApi';

const RegisterTypeForm = () => {
  const [form, setForm] = useState({
    module_address: '',
    type_name: '',
    type: '',
    url: '',
    owner: '',
    password: '',
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await registerType(form);
      setResult('등록 성공: ' + JSON.stringify(res));
    } catch (err: any) {
      setResult('등록 실패: ' + (err?.message || '오류'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input name="module_address" placeholder="게임 Dapp 주소" value={form.module_address} onChange={handleChange} required />
      <input name="type_name" placeholder="타입 이름 (ex: GameX::Sword)" value={form.type_name} onChange={handleChange} required />
      <input name="type" placeholder="타입 구조" value={form.type} onChange={handleChange} required />
      <input name="url" placeholder="게임 링크" value={form.url} onChange={handleChange} required />
      <input name="owner" placeholder="실행자 주소" value={form.owner} onChange={handleChange} required />
      <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? '등록 중...' : '등록하기'}</button>
      {result && <div style={{ marginTop: 12 }}>{result}</div>}
    </form>
  );
};

export default RegisterTypeForm;
