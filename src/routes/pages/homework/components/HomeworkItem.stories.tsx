import type { Meta, StoryObj } from '@storybook/react'
import HomeworkItem from './HomeworkItem'
import HomeworkItemSkeleton from './HomeworkItemSkeleton'
import '../../../../index.css'

const meta: Meta<typeof HomeworkItem> = {
  title: 'Components/숙제',
  component: HomeworkItem,
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
    title: '과제 제목',
    description: '과제 설명',
    date: '2023-04-01',
    unsubmittedStudents: []
  },
  argTypes: {
    title: {
      control: 'text',
      description: '과제 제목'
    },
    description: {
      control: 'text',
      description: '과제 설명'
    },
    date: {
      control: 'date',
      description: '과제 제출일'
    },
    unsubmittedStudents: {
      control: 'object',
      description: '과제 제출하지 않은 학생 목록'
    }
  }
}

export default meta

export const 모든_학생_제출: StoryObj<typeof HomeworkItem> = {
  args: {
    title: '과제 제목',
    description: '과제 설명',
    date: '2023-04-01',
    unsubmittedStudents: []
  }
}

export const 일부_학생_미제출: StoryObj<typeof HomeworkItem> = {
  args: {
    title: '과제 제목',
    description: '과제 설명',
    date: '2023-04-01',
    unsubmittedStudents: [
      {
        id: '1',
        studentId: 1,
        name: '홍길동',
        gender: 'male'
      },
      {
        id: '2',
        studentId: 2,
        name: '이재은',
        gender: 'female'
      }
    ]
  }
}

export const 스켈레톤: StoryObj<typeof HomeworkItemSkeleton> = {
  render: () => <HomeworkItemSkeleton />
}
