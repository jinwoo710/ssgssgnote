import type { Meta, StoryObj } from '@storybook/react'
import StudentNameTag from './StudentNameTag'
import StudentNameTagSkeleton from './StudentNameTagSkeleton'
import '../../index.css'

const meta: Meta<typeof StudentNameTag> = {
  title: 'Components/학생 이름 태그',
  component: StudentNameTag,
  decorators: [
    Story => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    student: {
      id: '20',
      name: '홍길동',
      gender: 'male',
      studentId: 20
    },
    simpleVersion: false,
    miniVersion: false,
    sliceVersion: false
  },
  argTypes: {
    student: {
      control: 'object',
      description: '학생 정보 객체 (id, studentId, name, gender 등)'
    },
    simpleVersion: {
      type: { name: 'boolean', required: false },
      control: 'boolean',
      description: '이름만 간단히 보여주는 버전 (번호.이름)'
    },
    miniVersion: {
      type: { name: 'boolean', required: false },
      control: 'boolean',
      description: '작은 사이즈로 출력하는 버전 (이름)'
    },
    sliceVersion: {
      type: { name: 'boolean', required: false },
      control: 'boolean',
      description: '패딩이 없는 슬라이스 스타일 버전'
    }
  }
}

export default meta
type Story = StoryObj<typeof StudentNameTag>

export const 남학생_기본형: Story = {
  args: {
    student: {
      id: '20',
      name: '홍길동',
      gender: 'male',
      studentId: 20
    }
  }
}

export const 여학생_기본형: Story = {
  args: {
    student: {
      id: '21',
      name: '이재은',
      gender: 'female',
      studentId: 21
    }
  }
}
export const Mini: Story = {
  args: {
    student: {
      id: '3',
      studentId: 24,
      name: '이민수',
      gender: 'male'
    },
    miniVersion: true
  }
}
export const Slice: Story = {
  args: {
    student: {
      id: '4',
      studentId: 25,
      name: '박지현',
      gender: 'female'
    },
    sliceVersion: true
  }
}

export const Simple: Story = {
  args: {
    student: {
      id: '5',
      studentId: 28,
      name: '이순신',
      gender: 'male'
    },
    simpleVersion: true
  }
}

export const 스켈레톤: Story = {
  render: () => <StudentNameTagSkeleton />
}
