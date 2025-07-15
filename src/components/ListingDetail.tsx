import { useParams } from "react-router-dom";
import { dummyListings } from "../utils/dummy";
import { Card, Container, Text } from "@radix-ui/themes";
import { useState } from "react";
import { listNFT, cancelListing } from "../api/listingApi";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();

  const listing = dummyListings.find((item) => item.id === id);

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleList = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await listNFT({ id, ...listing });
      setResult("등록 성공: " + JSON.stringify(res));
    } catch (err: any) {
      setResult("등록 실패: " + (err?.message || "오류"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await cancelListing({ id });
      setResult("취소 성공: " + JSON.stringify(res));
    } catch (err: any) {
      setResult("취소 실패: " + (err?.message || "오류"));
    } finally {
      setLoading(false);
    }
  };

  if (!listing) return <p>Listing not found</p>;

  return (
    <div style={{
      background: '#181A20', minHeight: '100vh', padding: '40px 0',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start'
    }}>
      <div style={{
        background: '#23262F', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        padding: 32, width: 400, color: '#fff',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img
            src={listing.metadata?.image || 'https://via.placeholder.com/200x200?text=NFT'}
            alt={listing.metadata?.name}
            style={{ width: 200, height: 200, borderRadius: 12, objectFit: 'cover', marginBottom: 16, background: '#111' }}
          />
          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>{listing.metadata?.name}</div>
          <div style={{ color: '#aaa', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>{listing.metadata?.description}</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: '#888' }}>소유자</div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>{listing.owner}</div>
          <div style={{ fontSize: 14, color: '#888' }}>타입</div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>{listing.type_name}</div>
          <div style={{ fontSize: 14, color: '#888' }}>가격</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{Number(listing.price) / 1e9} SUI</div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button
            onClick={handleList}
            disabled={loading}
            style={{
              background: '#3772FF', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px',
              fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(55,114,255,0.15)',
              opacity: loading ? 0.6 : 1, transition: 'background 0.2s',
            }}
          >
            NFT 등록
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            style={{
              background: '#FF5757', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px',
              fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,87,87,0.15)',
              opacity: loading ? 0.6 : 1, transition: 'background 0.2s',
            }}
          >
            NFT 등록 취소
          </button>
        </div>
        {result && <div style={{ marginTop: 12, color: '#FFD600', fontWeight: 500 }}>{result}</div>}
      </div>
    </div>
  );
}
