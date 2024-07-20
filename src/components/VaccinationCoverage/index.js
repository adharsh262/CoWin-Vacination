// Write your code here

import {
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccCoverageDataList} = props

  const updatedData = vaccCoverageDataList.map(eachData => ({
    dose1: eachData.dose_1,
    dose2: eachData.dose_2,
    vaccineDate: eachData.vaccine_date,
  }))

  const dataFormater = number => {
    if (number < 1000) {
      return number.toString()
    }
    return `${number / 1000}k`.toString()
  }

  return (
    <div className="VaccinationCoverageContainer">
      <h1 className="paraAlign">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={updatedData} margin={{top: 5}}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'grey', strokewidth: 0}}
          />
          <YAxis
            tickFormatter={dataFormater}
            tick={{stroke: 'grey', strokewidth: 1}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
