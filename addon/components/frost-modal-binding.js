import Ember from 'ember'
const {
  Component,
  inject
} = Ember
import layout from '../templates/components/frost-modal-binding'
import { PropTypes } from 'ember-prop-types'

const FrostModalBinding = Component.extend({

  // == Dependencies ==========================================================

  modalService: inject.service('frost-modal'),
  routing: inject.service('-routing'),

  // == Component properties ==================================================

  layout,

  // == State properties ======================================================

  propTypes: {
    // Positional params
    modal: PropTypes.string.isRequired,

    // Options
    animation: PropTypes.func,
    classModifier: PropTypes.string,
    closeOnOutsideClick: PropTypes.bool,
    isVisible: PropTypes.bool.isRequired,
    params: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    targetOutlet: PropTypes.string,

    // Actions
    onCancel: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func
  },

  getDefaultProps () {
    return {
      closeOnOutsideClick: false,
      targetOutlet: 'modal'
    }
  },

  // == Events ================================================================

  didReceiveAttrs () {
    this.get('modalService').setState(this.modalComponentName, this.isVisible)
  },

  // == Actions ===============================================================

  actions: {
    _onCancel () {
      const onCancel = this.get('onCancel')
      if (onCancel) {
        onCancel()
      }
      this.onClose()
    },

    _onConfirm () {
      const onConfirm = this.get('onConfirm')
      if (onConfirm) {
        onConfirm()
      }
      this.onClose()
    },

    _onOutsideClick () {
      if (this.get('closeOnOutsideClick')) {
        this.onClose()
      }
    }
  }

})

FrostModalBinding.reopenClass({
  positionalParams: [ 'modal' ]
})

export default FrostModalBinding
