
const sm = new Ext.grid.CheckboxSelectionModel();


var data = [
    ['Jack', 'Bering', 'male', '18', '2019-08-16T12:23:00', '👨'],
    ['Amy', 'Suez', 'female', '18', '2019-08-16T12:23:00', '👩'],
    ['Loki', 'Suez', 'male', '18', '2019-08-16T12:23:00', '👨'],
    ['Maggie', 'Suez', 'female', '18', '2019-08-16T12:23:00', '👩'],
    ['Kane', 'Panama', 'male', '18', '2019-08-16T12:23:00', '👨'],
    ['Tina', 'Panama', 'female', '18', '2019-08-16T12:23:00', '👩'],
];

var store = new Ext.data.GroupingStore({
    proxy: new Ext.data.PagingMemoryProxy(data),
    reader: new Ext.data.ArrayReader({}, [
        {name: 'name'},
        {name: 'class'},
        {name: 'sex'},
        {name: 'age'},
        {name: 'birthday'},
        {name: 'avatar'}
    ]),
    groupField: 'class'
});

var Record = Ext.data.Record.create([
    {name: 'name', type: 'string'},
    {name: 'class', type: 'string'},
    {name: 'sex', type: 'string'},
    {name: 'age', type: 'string'},
    {name: 'birthday', type: 'date',dateFormat:"Y-m-dTH:i:s"},
    {name: 'avatar', type: 'string'}
]);


const getEditor_TextField = function () {
    return new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false}))
};

const getEditor_DateField = function () {
    return new Ext.grid.GridEditor(new Ext.form.DateField({allowBlank:false}))
};

const moveItemUp = function (grid) {
    if(sm.getSelections().length !==0){
        var selectItem = sm.getSelections()[0];
        var insertIndex=store.indexOfId(selectItem.id);
        grid.stopEditing();
        store.remove(selectItem);
        store.insert(insertIndex-1,selectItem);
    }
};

const moveItemDown = function (grid) {
    if(sm.getSelections().length !==0){
        var selectItem = sm.getSelections()[0];
        var insertIndex=store.indexOfId(selectItem.id);
        grid.stopEditing();
        store.remove(selectItem);
        store.insert(insertIndex+1,selectItem);
    }
};

const moveItemToHead = function (grid) {
    if(sm.getSelections().length !==0){
        var selectItem = sm.getSelections()[0];
        grid.stopEditing();
        store.remove(selectItem);
        store.insert(0,selectItem);
    }
};

const moveItemToBottom = function (grid) {
    if(sm.getSelections().length !==0){
        var selectItem = sm.getSelections()[0];
        grid.stopEditing();
        store.remove(selectItem);
        store.insert(store.totalLength-1,selectItem);
    }
};

const addItem = function (grid) {
    var p = new Record({name: '', class: '', sex: '', age: '', birthday: '', avatar: ''});
    if(sm.getSelections().length === 0){
        grid.stopEditing();
        store.insert(0, p);
    }else {
        var selectItem = sm.getSelections()[0];
        var insertIndex=store.indexOfId(selectItem.id)+1;
        p.set('class',selectItem.data.class);
        store.insert(insertIndex,p);
    }
    grid.startEditing(0, 0);
};

const delItem = function (grid) {
    Ext.Msg.confirm('tips', 'delete certainly？', function (btn) {
        if (btn === 'yes') {
            store.remove(sm.getSelections());
            grid.getView().refresh();
        }
    });
}