import { useState } from 'react';
import { 
  Flex, 
  Text, 
  TextField, 
  Button, 
  Select, 
  Separator,
  Card,
  Badge
} from '@radix-ui/themes';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'select' | 'multi-select' | 'range' | 'search';
  options?: FilterOption[];
  placeholder?: string;
  min?: number;
  max?: number;
}

interface FilterPanelProps {
  groups: FilterGroup[];
  values: Record<string, any>;
  onChange: (filterId: string, value: any) => void;
  onReset: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export function FilterPanel({
  groups,
  values,
  onChange,
  onReset,
  searchValue = '',
  onSearchChange,
  isCollapsible = false,
  defaultCollapsed = false,
  className
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.map(group => group.id))
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getActiveFiltersCount = () => {
    return Object.entries(values).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== '';
    }).length;
  };

  const renderFilterGroup = (group: FilterGroup) => {
    const isExpanded = expandedGroups.has(group.id);
    const currentValue = values[group.id];

    return (
      <div key={group.id} style={{ marginBottom: '1rem' }}>
        <Button
          variant="ghost"
          onClick={() => toggleGroup(group.id)}
          style={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '8px 12px',
            marginBottom: '8px',
            color: 'var(--foreground)',
            borderRadius: '6px'
          }}
        >
          <Flex align="center" gap="2">
            <Text size="3" weight="medium">
              {group.title}
            </Text>
            {Array.isArray(currentValue) && currentValue.length > 0 && (
              <Badge color="blue" size="1">
                {currentValue.length}
              </Badge>
            )}
            {!Array.isArray(currentValue) && currentValue && (
              <Badge color="blue" size="1">
                1
              </Badge>
            )}
          </Flex>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>

        {isExpanded && (
          <div style={{ paddingLeft: '12px' }}>
            {group.type === 'select' && (
              <Select.Root
                value={currentValue || ''}
                onValueChange={(value) => onChange(group.id, value)}
              >
                <Select.Trigger
                  style={{ width: '100%' }}
                  placeholder={group.placeholder}
                />
                <Select.Content>
                  <Select.Item value="all">모든 항목</Select.Item>
                  {group.options?.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      <Flex justify="between" style={{ width: '100%' }}>
                        <span>{option.label}</span>
                        {option.count && (
                          <Badge color="gray" size="1">
                            {option.count}
                          </Badge>
                        )}
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}

            {group.type === 'multi-select' && (
              <Flex direction="column" gap="2">
                {group.options?.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 0',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={currentValue?.includes(option.value) || false}
                      onChange={(e) => {
                        const newValue = currentValue || [];
                        if (e.target.checked) {
                          onChange(group.id, [...newValue, option.value]);
                        } else {
                          onChange(group.id, newValue.filter((v: string) => v !== option.value));
                        }
                      }}
                      style={{
                        accentColor: 'var(--primary)',
                      }}
                    />
                    <Flex justify="between" style={{ flex: 1 }}>
                      <Text size="2">{option.label}</Text>
                      {option.count && (
                        <Badge color="gray" size="1">
                          {option.count}
                        </Badge>
                      )}
                    </Flex>
                  </label>
                ))}
              </Flex>
            )}

            {group.type === 'range' && (
              <Flex gap="2" align="center">
                <TextField.Root
                  type="number"
                  placeholder={group.min?.toString() || '최소값'}
                  value={currentValue?.min || ''}
                  onChange={(e) =>
                    onChange(group.id, {
                      ...currentValue,
                      min: e.target.value ? Number(e.target.value) : undefined
                    })
                  }
                  style={{ flex: 1 }}
                />
                <Text size="2">~</Text>
                <TextField.Root
                  type="number"
                  placeholder={group.max?.toString() || '최대값'}
                  value={currentValue?.max || ''}
                  onChange={(e) =>
                    onChange(group.id, {
                      ...currentValue,
                      max: e.target.value ? Number(e.target.value) : undefined
                    })
                  }
                  style={{ flex: 1 }}
                />
              </Flex>
            )}

            {group.type === 'search' && (
              <TextField.Root
                placeholder={group.placeholder}
                value={currentValue || ''}
                onChange={(e) => onChange(group.id, e.target.value)}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  if (isCollapsible && isCollapsed) {
    return (
      <Card style={{ padding: '1rem', background: 'var(--card)' }} className={className}>
        <Button
          variant="soft"
          onClick={() => setIsCollapsed(false)}
          style={{ width: '100%' }}
        >
          <Filter size={16} />
          <Text>필터 표시</Text>
          {getActiveFiltersCount() > 0 && (
            <Badge color="blue" size="1">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </Card>
    );
  }

  return (
    <Card 
      style={{ 
        padding: '1rem', 
        background: 'var(--card)',
        border: '1px solid var(--border)',
        minHeight: 'fit-content'
      }} 
      className={className}
    >
      <Flex direction="column" gap="3">
        {/* Header */}
        <Flex justify="between" align="center">
          <Flex align="center" gap="2">
            <Filter size={16} />
            <Text size="4" weight="bold" style={{ color: 'var(--foreground)' }}>
              필터
            </Text>
            {getActiveFiltersCount() > 0 && (
              <Badge color="blue">
                {getActiveFiltersCount()}개 적용됨
              </Badge>
            )}
          </Flex>
          <Flex gap="2">
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="1" onClick={onReset}>
                <X size={14} />
                초기화
              </Button>
            )}
            {isCollapsible && (
              <Button
                variant="ghost"
                size="1"
                onClick={() => setIsCollapsed(true)}
              >
                <ChevronUp size={16} />
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Search */}
        {onSearchChange && (
          <>
            <TextField.Root
              placeholder="검색어를 입력하세요..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            >
              <TextField.Slot>
                <Search size={16} />
              </TextField.Slot>
            </TextField.Root>
            <Separator />
          </>
        )}

        {/* Filter Groups */}
        <Flex direction="column" gap="2">
          {groups.map(renderFilterGroup)}
        </Flex>
      </Flex>
    </Card>
  );
}