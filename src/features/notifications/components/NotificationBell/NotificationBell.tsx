import { Button, Popover, Text, Flex, Badge } from "@radix-ui/themes";
import { Bell, X } from "lucide-react";
import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

// 더미 알림 데이터
const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'NFT 판매 완료',
    message: 'Epic Sword가 0.5 SUI에 판매되었습니다.',
    type: 'success',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    read: false,
  },
  {
    id: '2',
    title: '새로운 좋아요',
    message: '회원님의 Legendary Shield에 좋아요가 추가되었습니다.',
    type: 'info',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
    read: false,
  },
  {
    id: '3',
    title: '가격 변동 알림',
    message: '관심있는 NFT의 가격이 20% 하락했습니다.',
    type: 'warning',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1일 전
    read: true,
  },
];

export function NotificationBell() {
  const currentAccount = useCurrentAccount();
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const time = new Date(timestamp).getTime();
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  };

  if (!currentAccount) {
    return null; // 지갑이 연결되지 않았을 때는 표시하지 않음
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" size="3" style={{ position: "relative" }}>
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              color="red"
              variant="solid"
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                minWidth: "18px",
                height: "18px",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </Popover.Trigger>
      
      <Popover.Content 
        style={{ 
          width: "320px", 
          maxHeight: "400px", 
          overflow: "auto",
          background: "var(--gray-2)",
          border: "1px solid var(--gray-6)",
        }}
      >
        <Flex justify="between" align="center" mb="3">
          <Text size="4" weight="bold" style={{ color: "white" }}>
            알림
          </Text>
          {unreadCount > 0 && (
            <Button variant="ghost" size="1" onClick={markAllAsRead}>
              <Text size="2" color="blue">모두 읽음</Text>
            </Button>
          )}
        </Flex>

        {notifications.length === 0 ? (
          <Text size="3" color="gray" style={{ textAlign: "center", padding: "2rem 0" }}>
            알림이 없습니다
          </Text>
        ) : (
          <Flex direction="column" gap="2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: notification.read ? "var(--gray-3)" : "var(--blue-3)",
                  border: `1px solid ${notification.read ? "var(--gray-6)" : "var(--blue-6)"}`,
                  cursor: notification.read ? "default" : "pointer",
                }}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <Flex justify="between" align="start" mb="1">
                  <Text size="3" weight="bold" style={{ color: "white" }}>
                    {notification.title}
                  </Text>
                  <Button
                    variant="ghost"
                    size="1"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X size={12} />
                  </Button>
                </Flex>
                
                <Text size="2" color="gray" style={{ marginBottom: "8px" }}>
                  {notification.message}
                </Text>
                
                <Text size="1" color="gray">
                  {formatTimeAgo(notification.timestamp)}
                </Text>
              </div>
            ))}
          </Flex>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}