import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

export default function AcademicSemester() {
  const { data: academicSemester } = useGetAllAcademicSemesterQuery(undefined);
  console.log(academicSemester);
  return <div>AcademicSemester</div>;
}
