import { Container } from "@radix-ui/themes";
import ListingList from "../components/ListingList";

export default function Home() {
  return (
    <Container mt="5">
      <h1>Hello from Home page!</h1>
        <ListingList />
      <h1 style={{ color: "white" }}>✅ 화면 출력 테스트 성공!</h1>
    </Container>
  );
}
