/*
version 1.6
*/
function w3Table()
{
  var selfie = this;
  var target;
  var table;
  var conf;
  var activeRowIndex = 1;
  var totalRowPages = 1;
  this.init= function(u, o)
  {
    target = u;
    conf = $.extend({
      headers: [],
      theadCss: 'w3-light-gray',
      css: 'w3-bordered w3-striped',
      defaultCSS: 'w3-table',
      rowCount: 10,
      btnNavCss: 'w3-green',
      showButtons: false,
      buttonIconsOnly: false,
      buttons: [], // {label: '', css:'', title: ''}
      buttonPosition: 'first', // last/first
    }, o);
    selfie._tabl();
  }
  //---
  this._tabl = function()
  {
    var str ='<table class="'+ conf['defaultCSS']+' '+conf['css']+'"><thead class="'+conf['theadCss']+'"><tr>';
    var thead;
    var btns = '';
    var theaderStr=  '';

    for(i in conf['headers'])
    {
      thead = $.extend({
        label: 'Title',
        style: '',
        css: '',
      }, conf['headers'][i]);
      theaderStr +='<th style="'+thead['style']+'" class="'+thead['css']+'">'+thead['label']+'</th>';
    }

    if(conf['showButtons'])
    {
      var width = (parseInt(conf['buttons'].length) * 50);
      btns +='<th style="width:'+width+'px;">&nbsp;</th>';
      if(conf['buttonPosition'] == 'last')
      {
        str += theaderStr + ' '+ btns;
      }
      else
      {
        str += btns+ ' '+ theaderStr
      }
      
    }
    else
    {
      str += theaderStr;
    }


    str +='</tr></thead><tbody></tbody></table><div class="w3-bar w3-bar-footer" style="margin-top:0.5em"></div>';
    target.empty().append(str);
    table = target.find('table');
  }
  //---
  this.parse = function(obj)
  {
    var btnStr ='';
    var tdStr = '';
    var str = '';
    var row;
    var count = 1;
    var trCount = 1;
    var entryCount = 0;
    var tableButton;
    activeRowIndex = 1;
    totalRowPages = 1;
    var tdClass = '';
    var trAddCss = '';
    for(i in obj)
    {
      trAddCss = '';
      if(obj[i]['css'])
      {
        trAddCss = obj[i]['css'];
      }

      btnStr = '';
      if(count > conf['rowCount'])
      {
        count = 1;
        trCount++;
        totalRowPages++;
      }
      row = obj[i];     
      tdStr = '';
      str +='<tr class="w3jstable-row-'+trCount+' '+trAddCss+'" data-rowid="'+row['id']+'">'; 
      
      for(o in row['data'])
      {
        if(conf['headers'][o]['css']) tdClass = conf['headers'][o]['css'];
        else tdClass= '';
        tdStr+='<td class="'+tdClass+'">'+row['data'][o]+'</td>';
      }  

      if(conf['showButtons'])
      {
        btnStr +='<td><div class="w3-bar w3-small">';
        for(btni in conf['buttons'])
        {
          tableButton = $.extend({
            label :'',
            css : '',
            title: '',
          }, conf['buttons'][btni]);
          btnStr +='<button data-uid="'+row['id']+'" data-bid="btn'+btni+'id" class="w3-bar-item '+tableButton['css']+'" title="'+tableButton['title']+'" role="button" type="button">'+tableButton['label']+'</button>';
        }
        btnStr +='</div></td>';
      }

      if(conf['buttonPosition'] == 'last') str += tdStr+btnStr;
      else str+= btnStr+tdStr;

      str+='</tr>';

      
      count++;
      entryCount++;
    }

    table.find('tbody').empty().append(str);
    table.find('tbody tr').hide().end().find('tr.w3jstable-row-'+activeRowIndex).show();
    var btn = '';
    btn+='';
    if(entryCount > conf['rowCount'])
    {
      btn+='<button class="w3-bar-item w3-left btn-nav-prev w3-padding-small  w3-btn '+conf['btnNavCss']+'" style="margin-right:2px"><i class="fa fa-arrow-left"></i> PREV</button>';
      btn+='<button class="w3-bar-item w3-left btn-nav-next w3-padding-small w3-btn '+conf['btnNavCss']+'"><i class="fa fa-arrow-right"></i> NEXT</button>';
    }
    
    //btn+='<label class="w3-bar-item w3-right"><span class="w3-tag">'+entryCount+'</span></label><label class="w3-bar-item lbl-page-counter w3-right">PG: '+activeRowIndex+'/'+totalRowPages+'</label></div>';
    btn+='<label class="w3-bar-item w3-right"><span class="lbl-page-counter">'+activeRowIndex+'/'+totalRowPages+'</span> | <span class="w3-tag">'+entryCount+'</span></label>';

    target.find('.w3-bar-footer').empty().append(btn);
    target.find('.btn-nav-next').unbind('click').click(function(){
      if(activeRowIndex == totalRowPages)
      {
        return false;
      }
      activeRowIndex++;
      table.find('tbody tr').hide().end().find('tr.w3jstable-row-'+activeRowIndex).show();
      target.find('span.lbl-page-counter').html('Page: '+activeRowIndex+'/'+totalRowPages);
    });

    target.find('.btn-nav-prev').unbind('click').click(function(){
      if(activeRowIndex <= 1)
      {
        activeRowIndex = 1;
        return false;
      }
      activeRowIndex--;
      table.find('tbody tr').hide().end().find('tr.w3jstable-row-'+activeRowIndex).show();
      target.find('span.lbl-page-counter').html('Page: '+activeRowIndex+'/'+totalRowPages);
    });

  }
  //---
  this.buttonClicked = function(r){
    table.on('click', 'button', function(){
      r($(this));
    });
  }
  //---
}
