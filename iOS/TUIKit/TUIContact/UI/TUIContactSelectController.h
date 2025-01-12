/******************************************************************************
 *
 *  腾讯云通讯服务界面组件 TUIKIT - 好友选择界面组件
 *  本文件声明用于选择好友的界面。即在您创建群聊时，为您提供好友选择，是您能够快速、批量的选择群内成员。
 *
 ******************************************************************************/

#import <UIKit/UIKit.h>
#import "TUIDefine.h"
#import "TUIContactSelectViewDataProvider.h"

NS_ASSUME_NONNULL_BEGIN

typedef void(^ContactSelectFinishBlock)(NSArray<TUICommonContactSelectCellData *> * _Nonnull selectArray);

/**
 * 【模块名称】好友选择界面（TUIContactSelectController）
 * 【功能说明】为用户提供好友选择功能，在创建群聊/讨论组时能够快速选择群组成员。
 */
@interface TUIContactSelectController : UIViewController

@property (nonatomic) TUIContactSelectViewDataProvider * _Nullable viewModel;

/**
 * 选择结束回调
 */
@property (nonatomic, copy) ContactSelectFinishBlock _Nullable finishBlock;

/**
 * 最多选择个数
 */
@property NSInteger maxSelectCount;

/**
 * 自定义的数据列表
 */
@property NSArray * _Nullable sourceIds;

/**
 * 需要禁用的数据列表
 */
@property NSArray * _Nullable disableIds;

@end

NS_ASSUME_NONNULL_END
