// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiUpdateStatus = {
  loadingView: 'In_Progress',
  failureView: 'Failure_View',
  successView: 'Success_View',
  initialView: 'Initial',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiUpdateStatus.initialView, dataList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiUpdateStatus.loadingView})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok) {
      this.setState({apiStatus: apiUpdateStatus.successView, dataList: data})
    } else {
      this.setState({apiStatus: apiUpdateStatus.failureView})
    }
  }

  renderLoading = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderChartsView = () => {
    const {dataList} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccCoverageDataList={dataList.last_7_days_vaccination}
        />
        <VaccinationByGender
          vaccDataGenderList={dataList.vaccination_by_gender}
        />
        <VaccinationByAge vaccDataAgeList={dataList.vaccination_by_age} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failureView"
        alt="failure view"
      />
      <h1 className="paraAlign">Something went wrong</h1>
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUpdateStatus.loadingView:
        return this.renderLoading()
      case apiUpdateStatus.failureView:
        return this.renderFailureView()
      case apiUpdateStatus.successView:
        return this.renderChartsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="mainBg">
            <div className="headerMainPage">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="imgLogo"
              />
              <h1 className="headMain">Co-WIN</h1>
            </div>
            <h1>CoWIN Vaccination in India</h1>
            {this.renderAllViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
