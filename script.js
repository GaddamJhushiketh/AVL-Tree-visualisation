class AVLNode{

constructor(data){
this.data=data
this.height=1
this.left=null
this.right=null
}

}

let root=null

function height(n){
return n ? n.height : 0
}

function updateHeight(n){
n.height=1+Math.max(height(n.left),height(n.right))
}

function getBF(n){
return height(n.left)-height(n.right)
}

function rightRotate(y){

let x=y.left
let t2=x.right

x.right=y
y.left=t2

updateHeight(y)
updateHeight(x)

return x
}

function leftRotate(x){

let y=x.right
let t2=y.left

y.left=x
x.right=t2

updateHeight(x)
updateHeight(y)

return y
}

function insert(root,val){

if(!root) return new AVLNode(val)

if(val<root.data)
root.left=insert(root.left,val)
else
root.right=insert(root.right,val)

updateHeight(root)

let bf=getBF(root)

if(bf>1 && val<root.left.data)
return rightRotate(root)

if(bf<-1 && val>root.right.data)
return leftRotate(root)

if(bf>1 && val>root.left.data){
root.left=leftRotate(root.left)
return rightRotate(root)
}

if(bf<-1 && val<root.right.data){
root.right=rightRotate(root.right)
return leftRotate(root)
}

return root
}

function insertNode(){

let value=document.getElementById("valueInput").value

if(value==="") return

root=insert(root,parseInt(value))

drawTree()

}

function resetTree(){
root=null
drawTree()
}

function drawTree(){

const container=document.getElementById("tree")

container.innerHTML=""

let svg=document.createElementNS("http://www.w3.org/2000/svg","svg")

svg.setAttribute("width","900")
svg.setAttribute("height","500")

container.appendChild(svg)

drawNode(svg,root,450,40,200)

}

function drawNode(svg,node,x,y,offset){

if(!node) return

if(node.left){

drawLine(svg,x,y,x-offset,y+70)

drawNode(svg,node.left,x-offset,y+70,offset/2)

}

if(node.right){

drawLine(svg,x,y,x+offset,y+70)

drawNode(svg,node.right,x+offset,y+70,offset/2)

}

let circle=document.createElementNS("http://www.w3.org/2000/svg","circle")

circle.setAttribute("cx",x)
circle.setAttribute("cy",y)
circle.setAttribute("r",20)
circle.setAttribute("class","node")

svg.appendChild(circle)

let text=document.createElementNS("http://www.w3.org/2000/svg","text")

text.setAttribute("x",x)
text.setAttribute("y",y+5)
text.setAttribute("class","text")

text.textContent=node.data

svg.appendChild(text)

}

function drawLine(svg,x1,y1,x2,y2){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x1)
line.setAttribute("y1",y1)
line.setAttribute("x2",x2)
line.setAttribute("y2",y2)
line.setAttribute("stroke","black")

svg.appendChild(line)

}
function minValueNode(node){
    let current = node
    while(current.left != null)
        current = current.left
    return current
}
function deleteAVL(root, key){

    if(root == null) return root

    if(key < root.data)
        root.left = deleteAVL(root.left, key)

    else if(key > root.data)
        root.right = deleteAVL(root.right, key)

    else{

        if(root.left == null || root.right == null){

            let temp = root.left ? root.left : root.right

            if(temp == null){
                root = null
            }else{
                root = temp
            }

        }else{

            let temp = minValueNode(root.right)

            root.data = temp.data

            root.right = deleteAVL(root.right, temp.data)
        }
    }

    if(root == null)
        return root

    updateHeight(root)

    let bf = getBF(root)

    // LL
    if(bf > 1 && getBF(root.left) >= 0)
        return rightRotate(root)

    // LR
    if(bf > 1 && getBF(root.left) < 0){
        root.left = leftRotate(root.left)
        return rightRotate(root)
    }

    // RR
    if(bf < -1 && getBF(root.right) <= 0)
        return leftRotate(root)

    // RL
    if(bf < -1 && getBF(root.right) > 0){
        root.right = rightRotate(root.right)
        return leftRotate(root)
    }

    return root
}

function deleteNode(){

    let value = document.getElementById("valueInput").value

    if(value === "") return

    root = deleteAVL(root, parseInt(value))

    drawTree()

}