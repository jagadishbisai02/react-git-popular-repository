import './index.css'

const LanguageFilterItem = props => {
  const {
    setSelectedLanguageFiltereAndGetRepositories,
    isSelected,
    languageFilter,
  } = props

  const btnClassName = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'

  const onClickBtnLanguageFilter = () => {
    setSelectedLanguageFiltereAndGetRepositories(languageFilter.id)
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClickBtnLanguageFilter}
        className={btnClassName}
      >
        {languageFilter.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
