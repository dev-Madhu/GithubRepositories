import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeOptionId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllRepoData()
  }

  updateActiveOptionId = optionId => {
    this.setState({activeOptionId: optionId}, this.getAllRepoData)
  }

  getAllRepoData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {activeOptionId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoryList: updatedData,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {repositoryList} = this.state
    console.log(repositoryList)

    return (
      <ul className="repo-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLanguageFiltersList = () => {
    const {activeOptionId} = this.state

    return (
      <div className="repository-body">
        <ul className="filters-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageData={eachItem}
              isActive={eachItem.id === activeOptionId}
              updateActiveOptionId={this.updateActiveOptionId}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
