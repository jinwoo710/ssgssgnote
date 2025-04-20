import type { Meta, StoryObj } from '@storybook/react'
import CounselingItem from './CounselingItem'
import CounselingItemSkeleton from './CounselingItemSkeleton'
import '../../../../index.css'

const meta: Meta<typeof CounselingItem> = {
  title: 'Components/상담 아이템',
  component: CounselingItem,
  decorators: [
    Story => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    counseling: {
      id: '1',
      date: '2023-04-01',
      student: {
        id: '1',
        name: '홍길동',
        gender: 'male',
        studentId: 1
      },
      content: '상담 내용',
      studentId: '1',
      type: 'study'
    }
  },
  argTypes: {
    counseling: {
      control: 'object',
      description:
        '상담 정보 객체 (id, date, student, content, studentId, type)'
    }
  }
}

export default meta

export const 스터디: StoryObj<typeof CounselingItem> = {
  args: {
    counseling: {
      id: '1',
      date: '2023-04-01',
      student: {
        id: '1',
        name: '홍길동',
        gender: 'male',
        studentId: 1
      },
      content: '과제 3~5번까지 제출',
      studentId: '1',
      type: 'study'
    }
  }
}

export const 교우: StoryObj<typeof CounselingItem> = {
  args: {
    counseling: {
      id: '1',
      date: '2023-04-01',
      student: {
        id: '1',
        name: '홍길동',
        gender: 'male',
        studentId: 1
      },
      content: '친구와의 시간',
      studentId: '1',
      type: 'friend'
    }
  }
}

export const 태도: StoryObj<typeof CounselingItem> = {
  args: {
    counseling: {
      id: '1',
      date: '2023-04-01',
      student: {
        id: '1',
        name: '홍길동',
        gender: 'male',
        studentId: 1
      },
      content: '태도',
      studentId: '1',
      type: 'attitude'
    }
  }
}

export const 상담: StoryObj<typeof CounselingItem> = {
  args: {
    counseling: {
      id: '1',
      date: '2023-04-01',
      student: {
        id: '1',
        name: '홍길동',
        gender: 'male',
        studentId: 1
      },
      content:
        '학부모의 요청으로 인하여 2~4시에는 주도적인 학습을 하게 하였으며, 4시 이후에는 귀가를 도우미',
      studentId: '1',
      type: 'parent'
    }
  }
}

export const 스켈레톤: StoryObj<typeof CounselingItemSkeleton> = {
  render: () => <CounselingItemSkeleton />
}
