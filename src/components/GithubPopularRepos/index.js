import { Component } from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
    { id: 'ALL', language: 'All' },
    { id: 'JAVASCRIPT', language: 'Javascript' },
    { id: 'RUBY', language: 'Ruby' },
    { id: 'JAVA', language: 'Java' },
    { id: 'CSS', language: 'CSS' },
]

// Write your code here

const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
    state = {
        repositoriesData: [],
        selectedLanguageFilters: 'ALL',
        apiStatus: apiStatusConstants.initial,
    }

    componentDidMount() {
        this.getRepositories(languageFiltersData[0].id)
    }

    setRepositories = (fetchedData, success) => {
        this.setState({
            repositoriesData: fetchedData,
            apiStatus: success,
        })
    }

    getRepositories = async selectedLanguageFilters => {
        this.setState({ apiStatus: apiStatusConstants.inProgress })
        const response = await fetch(`${apiUrl}${selectedLanguageFilters}`)
        if (response.ok === true) {
            const data = await response.json()
            const updatedData = data.popular_repos.map(eachRepository => ({
                id: eachRepository.id,
                name: eachRepository.name,
                issuesCount: eachRepository.issues_count,
                forksCount: eachRepository.forks_count,
                starsCount: eachRepository.stars_count,
                avatarUrl: eachRepository.avatar_url,
            }))
            this.setRepositories(updatedData, apiStatusConstants.success)
        }
        if (response.status === 401) {
            this.setState({ apiStatus: apiStatusConstants.failure })
        }
    }

    renderRepositoryFailure = () => (
        <div className="failure-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
                className="failure-view-image"
            />
            <h1 className="failure-heading">Something Went Wrong</h1>
        </div>
    )

    renderRepositoriesList = () => {
        const { repositoriesData } = this.state

        return (
            <ul className="repository-card-list-container">
                {repositoriesData.map(eachRepository => (
                    <RepositoryItem
                        repositoryData={eachRepository}
                        key={eachRepository.id}
                    />
                ))}
            </ul>
        )
    }

    renderLoading = () => (
        <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
    )

    setSelectedLanguageFiltereAndGetRepositories = newFilterId => {
        this.setState({ selectedLanguageFilters: newFilterId })
        this.getRepositories(newFilterId)
    }

    renderLanguageFiltersList = () => {
        const { selectedLanguageFilters } = this.state

        return (
            <ul className="filter-list-container">
                {languageFiltersData.map(eachLanguage => (
                    <LanguageFilterItem
                        isSelected={eachLanguage.id === selectedLanguageFilters}
                        key={eachLanguage.id}
                        languageFilter={eachLanguage}
                        setSelectedLanguageFiltereAndGetRepositories={
                            this.setSelectedLanguageFiltereAndGetRepositories
                        }
                    />
                ))}
            </ul>
        )
    }

    renderGithubRepositories = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return this.renderLoading()
            case apiStatusConstants.success:
                return this.renderRepositoriesList()
            case apiStatusConstants.failure:
                return this.renderRepositoryFailure()
            default:
                return null
        }
    }

    render() {
        return (
            <div className="app-container">
                <div className="github-popular-repositories-container">
                    <h1 className="heading">Popular</h1>
                    {this.renderLanguageFiltersList()}
                    {this.renderGithubRepositories()}
                </div>
            </div>
        )
    }
}

export default GithubPopularRepos
