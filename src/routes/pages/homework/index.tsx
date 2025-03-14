import HomeworkItem from './components/HomeworkItem'

export default function Homework() {
  return (
    <div
      className="white-paper flex-col space-y-4"
      style={{
        backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
        backgroundSize: '100% 25px'
      }}>
      <div className="w-full flex justify-end">
        <button className="btn">과제 추가하기</button>
      </div>
      <div className="card flex-wrap w-full space-y-4 content-start space-x-4 min-h-[600px]">
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
        <HomeworkItem
          title="중간고사 대체 과제"
          description="중간고사 대체 과제"
          startDate="2025-03-01"
          endDate="2025-03-15"
          unsubmittedStudents={[1]}
          id={''}
        />
      </div>
    </div>
  )
}
