import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import ListingList from "../components/ListingList";

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#61b6fbff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 80,
      transition: 'background 0.4s',
    }}>
      <Heading
        size="9"
        style={{
          color: '#fff',
          fontWeight: 900,
          letterSpacing: '-2px',
          marginBottom: 12,
          textShadow: '0 6px 32px rgba(97,182,251,0.25), 0 1px 0 #fff',
        }}
      >
        SuiinOne
      </Heading>
      <Text
        size="5"
        style={{
          color: '#fff',
          fontWeight: 700,
          marginBottom: 32,
          textShadow: '0 2px 8px rgba(97,182,251,0.15)'
        }}
      >
        Marketplace for anyone
      </Text>
      <Flex gap="4" mb="8">
        <button
          style={{
            background: 'linear-gradient(90deg, #61b6fbff 0%, #aee6ff 100%)',
            color: '#23262F',
            border: 'none',
            borderRadius: 16,
            padding: '18px 40px',
            fontWeight: 800,
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(97,182,251,0.15)',
            marginRight: 16,
            transition: 'transform 0.1s, box-shadow 0.2s',
            filter: 'drop-shadow(0 2px 8px #61b6fb33)',
          }}
        >
          Sell your item
        </button>
        <button
          style={{
            background: 'linear-gradient(90deg, #aee6ff 0%, #61b6fbff 100%)',
            color: '#23262F',
            border: 'none',
            borderRadius: 16,
            padding: '18px 40px',
            fontWeight: 800,
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(97,182,251,0.10)',
            transition: 'transform 0.1s, box-shadow 0.2s',
            filter: 'drop-shadow(0 2px 8px #aee6ff33)',
          }}
        >
          Buy your item
        </button>
      </Flex>
      <div style={{
        width: '100%',
        maxWidth: 700,
        marginTop: 40,
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(97,182,251,0.10)',
        padding: 32,
        transition: 'box-shadow 0.2s',
      }}>
        <ListingList />
      </div>
    </div>
  );
}
