// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageData, updateActiveOptionId} = props
  const {id, language} = languageData
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickLanguageFilter = () => {
    updateActiveOptionId(id)
  }

  return (
    <li>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
