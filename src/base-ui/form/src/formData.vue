<template>
  <div class="hyform">
    <div class="header-title">
      <slot name="headerTitle"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="20">
        <template v-for="item in hyfromData" :key="item">
          <el-col v-bind="colLayout" :style="paddingWidth">
            <el-form-item :label="item.label">
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type == 'password'"
                  style="width: 100%"
                  v-model="formModel[`${item.value}`]"
                >
                </el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formModel[`${item.value}`]"
                >
                  <el-option
                    v-for="selectData in item.options"
                    :label="item.title"
                    :key="selectData.value"
                    :value="selectData.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  type="daterange"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formModel[`${item.value}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footerBtn">
      <slot name="footerBtn"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'formData',
  emits: ['update:modelValue'],
  props: {
    hyfromData: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    paddingWidth: {
      type: Object,
      default() {
        return { padding: '20px' }
      }
    },
    colLayout: {
      type: Object,
      default() {
        return {
          xl: 8,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    formDataModel: {
      type: Object
    }
  },
  setup(prop, { emit }) {
    const formModel = ref({ ...prop.formDataModel })
    watch(
      formModel,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formModel
    }
  }
})
</script>

<style scoped lang="less">
.hyform {
  padding-top: 30px;
  .header-title {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
  .el-row {
    width: 100%;
  }
  .footerBtn {
    text-align: right;
    padding: 40px;
  }
}
</style>
