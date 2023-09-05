import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './CircleColor.css'

let st = classNames.bind(styles)

function CircleColor({ percent }) {
  const classBorder = st('circle-color', {
    'circle-color__yellow': percent <= 7,
    'circle-color__orange': percent < 5,
    'circle-color__red': percent < 3,
    'circle-color__green': percent > 7,
  })

  return (
    <div className={classBorder}>
      <span>{percent.toFixed(1)}</span>
    </div>
  )
}

export default CircleColor

CircleColor.propTypes = {
  percent: PropTypes.number.isRequired,
}
